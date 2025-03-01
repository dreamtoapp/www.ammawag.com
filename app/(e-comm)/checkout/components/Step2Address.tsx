"use client";
import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import MapDisplay from "./MapDisplay";
import { checkUserExists, createUser } from "../actions/userActions";
import { UI_TEXT } from "../helpers/uiText";
import { useCartStore } from "@/store/cartStore";
import { ShiftSelector } from "./ShiftSelector";
import { useRouter } from "next/navigation";
import { CreateOrderInDb } from "../actions/creatOrder";
import { Checkbox } from "../../../../components/ui/checkbox";
import TermsDialog from "./TermsDialog";

interface UserData {
  id: string;
  phone: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
}

interface Step2AddressProps {
  phone: string;
  userExists: boolean;
  userData: UserData;
  onNext: () => void;
  onPrevious: () => void;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const Step2Address = ({
  phone,
  userExists,
  userData,
  onPrevious,
  setUserData,
}: Step2AddressProps) => {
  const [name, setName] = useState(userData?.name || "");
  const [address, setAddress] = useState(userData?.address || "");
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: string; lng: string }>({
    lat: userData.latitude || "",
    lng: userData.longitude || "",
  });
  const router = useRouter();
  const [selectedShiftId, setSelectedShiftId] = useState<string>(""); // State for selected shift

  const { cart, getTotalPrice, getTotalItems } = useCartStore();
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: true },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (userExists) {
      setName(userData.name || "");
      setAddress(userData.address || "");
      setCoordinates({
        lat: userData.latitude || "",
        lng: userData.longitude || "",
      });
    }
  }, [userData, userExists]);

  const handleGetCurrentLocation = () => {
    if (!isGeolocationAvailable) {
      alert("المتصفح لا يدعم تحديد الموقع");
      return;
    }
    if (!isGeolocationEnabled) {
      alert("يرجى تفعيل خدمة الموقع في المتصفح");
      return;
    }
    if (coords) {
      setCoordinates({
        lat: coords.latitude.toString(),
        lng: coords.longitude.toString(),
      });
    }
  };

  const handleSubmit = async () => {
    try {
      if (!userExists) {
        // Create new user
        const newUser = await createUser(
          phone,
          name,
          address,
          coordinates.lat,
          coordinates.lng
        );

        if (!newUser?.id) {
          throw new Error("Failed to create user account");
        }

        // Update state with new user ID before proceeding
        setUserData((prev) => ({ ...prev, id: newUser.id }));

        // Show OTP dialog for verification flow
        setShowOtpDialog(true);

        // Create order with the new user ID
        await createOrder(newUser.id);
        return;
      }

      // Handle existing user flow
      if (!userData?.id) {
        throw new Error("Existing user ID not found");
      }

      // Create order with existing user ID
      await createOrder(userData.id);
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        `Operation failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const createOrder = async (userId: string) => {
    const formattedCart = Object.values(cart).map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const orderData = {
      userId,
      phone,
      name,
      address,
      lat: coordinates.lat,
      lng: coordinates.lng,
      cart: formattedCart,
      totalAmount: getTotalPrice(),
      totalItems: getTotalItems(),
      shiftId: selectedShiftId, // Use selectedShiftId from state
    };

    const orderResult = await CreateOrderInDb(orderData);
    if (orderResult) {
      router.push(`/happyorder?orderid=${orderResult}`);
      return;
    }
    console.log("Order created:", orderResult);
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4 bg-background text-foreground rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{UI_TEXT.title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {userExists
            ? UI_TEXT.descriptionRegistered
            : UI_TEXT.descriptionUnregistered}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p>{UI_TEXT.phoneLabel}</p>
            <Input
              placeholder={UI_TEXT.namePlaceholder}
              name="phone"
              defaultValue={phone}
              disabled={true}
              className="bg-background text-foreground border-border focus-visible:ring-primary"
            />
          </div>
          <div className="flex flex-col">
            <p>موعد التسليم</p>

            <ShiftSelector
              selectedShiftId={selectedShiftId}
              onShiftSelect={(id) => setSelectedShiftId(id)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Input
            placeholder={UI_TEXT.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={userExists}
            required={!userExists}
            className="bg-background text-foreground border-border focus-visible:ring-primary"
          />
          <Input
            placeholder={UI_TEXT.addressPlaceholder}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={userExists}
            required={!userExists}
            className="bg-background text-foreground border-border focus-visible:ring-primary"
          />
          {coordinates.lat && coordinates.lng && (
            <div className="flex items-center gap-4 justify-evenly">
              <p className="text-sm text-gray-600">
                {UI_TEXT.latitudeLabel}{" "}
                <span className="font-medium">{coordinates.lat}</span>
              </p>
              <p className="text-sm text-gray-600">
                {UI_TEXT.longitudeLabel}{" "}
                <span className="font-medium">{coordinates.lng}</span>
              </p>
            </div>
          )}
          {!coordinates.lat || !coordinates.lng ? (
            <Button
              onClick={handleGetCurrentLocation}
              variant="outline"
              className="w-full hover:bg-muted transition-colors"
            >
              {UI_TEXT.fetchLocationButton}
            </Button>
          ) : (
            <MapDisplay
              coordinates={{
                lat: parseFloat(coordinates.lat),
                lng: parseFloat(coordinates.lng),
              }}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {/* Terms Agreement Checkbox */}
        <div className="flex items-center w-full gap-1">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
            className="border-primary data-[state=checked]:bg-primary"
          />
          <label
            htmlFor="terms"
            className="text-sm text-muted-foreground flex items-center gap-1"
          >
            أوافق على
          </label>
          <TermsDialog />
        </div>

        {/* Buttons Container */}
        <div className="flex justify-between items-center gap-4 w-full">
          <Button
            onClick={onPrevious}
            variant="outline"
            className="hover:bg-muted transition-colors"
          >
            {UI_TEXT.backButton}
          </Button>

          <Button
            onClick={handleSubmit}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            disabled={
              (!userExists && (!name.trim() || !address.trim())) ||
              !agreedToTerms || // Added agreement check
              !selectedShiftId // Existing shift selection check
            }
          >
            {UI_TEXT.nextButton}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Step2Address;
