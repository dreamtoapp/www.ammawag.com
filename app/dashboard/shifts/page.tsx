"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // For notifications
import { createShift, deleteShift, fetchShifts } from "./actions/actions";
import { Shift } from "./helper/types";
import { format, parse } from "date-fns";
import { ar } from "date-fns/locale";
import { Button } from "../../../components/ui/button";

export default function ShiftsPage() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newShift, setNewShift] = useState<Partial<Shift>>({
    name: "",
    startTime: "",
    endTime: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Fetch shifts on page load
  useEffect(() => {
    async function fetchData() {
      try {
        const shiftsData = await fetchShifts();
        setShifts(shiftsData);
      } catch (error) {
        console.error("Error fetching shifts:", error);
        toast.error("Failed to load shifts.");
      }
    }
    fetchData();
  }, []);

  // Handle dialog submission
  const handleAddShift = async () => {
    if (!newShift.name || !newShift.startTime || !newShift.endTime) {
      setErrors({
        name: !newShift.name ? "يرجى إدخال اسم الوردية." : "",
        startTime: !newShift.startTime ? "يرجى إدخال وقت البدء." : "",
        endTime: !newShift.endTime ? "يرجى إدخال وقت الانتهاء." : "",
      });
      return;
    }

    // Validate that startTime is earlier than endTime
    const start = parse(newShift.startTime, "hh:mm a", new Date(), {
      locale: ar,
    });
    const end = parse(newShift.endTime, "hh:mm a", new Date(), { locale: ar });

    if (start >= end) {
      setErrors({
        ...errors,
        endTime: "وقت البدء يجب أن يكون قبل وقت الانتهاء.",
      });
      return;
    }

    try {
      const createdShift = await createShift({
        ...newShift,
        startTime: format(start, "HH:mm"), // Convert to 24-hour format for storage
        endTime: format(end, "HH:mm"), // Convert to 24-hour format for storage
      } as Shift);

      setShifts([...shifts, createdShift]);
      setIsDialogOpen(false); // Close the dialog
      setNewShift({ name: "", startTime: "", endTime: "" }); // Reset form
      setErrors({});
      toast.success("تمت إضافة الوردية بنجاح!");
    } catch (error) {
      console.error("Error creating shift:", error);
      toast.error("فشل في إضافة الوردية.");
    }
  };

  // Handle shift deletion
  const handleDeleteShift = async (id: string) => {
    try {
      await deleteShift(id);
      setShifts(shifts.filter((shift) => shift.id !== id));
      toast.success("تم حذف الوردية بنجاح!");
    } catch (error) {
      console.error("Error deleting shift:", error);
      toast.error("فشل في حذف الوردية.");
    }
  };

  return (
    <div className="p-6 bg-background rounded-lg shadow-md space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold text-primary text-center">
        إدارة الورديات
      </h1>

      {/* Add Shift Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
          aria-label="إضافة وردية جديدة"
        >
          إضافة وردية جديدة
        </Button>
      </div>

      {/* Shifts List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shifts.length > 0 ? (
          shifts.map((shift) => {
            const start = parse(shift.startTime, "HH:mm", new Date());
            const end = parse(shift.endTime, "HH:mm", new Date());

            return (
              <Card
                key={shift.id}
                className="hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle>{shift.name}</CardTitle>
                  <CardDescription>
                    {format(start, "hh:mm a", { locale: ar })} -{" "}
                    {format(end, "hh:mm a", { locale: ar })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    مدة العمل:{" "}
                    {Math.abs(
                      (end.getTime() - start.getTime()) / (1000 * 60 * 60)
                    ).toFixed(2)}{" "}
                    ساعات
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteShift(shift.id)}
                    aria-label={`حذف الوردية ${shift.name}`}
                  >
                    حذف
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center space-y-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-muted-foreground"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-muted-foreground text-center">
              لا توجد ورديات متوفرة. <br />
              اضغط على الزر لإضافة وردية جديدة.
            </p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-primary text-primary-foreground"
            >
              إضافة وردية جديدة
            </Button>
          </div>
        )}
      </div>

      {/* Add Shift Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة وردية جديدة</DialogTitle>
            <DialogDescription>
              يرجى إدخال تفاصيل الوردية الجديدة أدناه.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <Label htmlFor="shiftName" className="block text-sm font-medium">
                اسم الوردية
              </Label>
              <Input
                id="shiftName"
                value={newShift.name || ""}
                onChange={(e) =>
                  setNewShift({ ...newShift, name: e.target.value })
                }
                placeholder="أدخل اسم الوردية (مثل 'نهار' أو 'ليل')"
                className="mt-1 block w-full border-input focus:border-primary focus:ring-primary"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Start Time Field */}
            <div>
              <Label htmlFor="startTime" className="block text-sm font-medium">
                وقت البدء
              </Label>
              <Input
                id="startTime"
                type="time"
                value={newShift.startTime || ""}
                onChange={(e) =>
                  setNewShift({ ...newShift, startTime: e.target.value })
                }
                className="mt-1 block w-full border-input focus:border-primary focus:ring-primary"
                aria-invalid={!!errors.startTime}
              />
              {errors.startTime && (
                <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
              )}
            </div>

            {/* End Time Field */}
            <div>
              <Label htmlFor="endTime" className="block text-sm font-medium">
                وقت الانتهاء
              </Label>
              <Input
                id="endTime"
                type="time"
                value={newShift.endTime || ""}
                onChange={(e) =>
                  setNewShift({ ...newShift, endTime: e.target.value })
                }
                className="mt-1 block w-full border-input focus:border-primary focus:ring-primary"
                aria-invalid={!!errors.endTime}
              />
              {errors.endTime && (
                <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              aria-label="إلغاء"
            >
              إلغاء
            </Button>
            <Button onClick={handleAddShift} aria-label="حفظ">
              حفظ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
