// app/dashboard/shifts/page.tsx
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
      toast.error("يرجى ملء جميع الحقول.");
      return;
    }

    // Validate that startTime is earlier than endTime
    const start = parse(newShift.startTime, "hh:mm a", new Date(), {
      locale: ar,
    });
    const end = parse(newShift.endTime, "hh:mm a", new Date(), { locale: ar });
    if (start >= end) {
      toast.error("وقت البدء يجب أن يكون قبل وقت الانتهاء.");
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
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        إدارة الورديات
      </h1>

      {/* Add Shift Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          إضافة وردية جديدة
        </Button>
      </div>

      {/* Shifts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shifts.length > 0 ? (
          shifts.map((shift) => {
            const start = parse(shift.startTime, "HH:mm", new Date());
            const end = parse(shift.endTime, "HH:mm", new Date());
            return (
              <Card key={shift.id}>
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
                  >
                    حذف
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            لا توجد ورديات متوفرة.
          </p>
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
            <div>
              <Label
                htmlFor="shiftName"
                className="block text-sm font-medium text-gray-700"
              >
                اسم الوردية
              </Label>
              <Input
                id="shiftName"
                value={newShift.name || ""}
                onChange={(e) =>
                  setNewShift({ ...newShift, name: e.target.value })
                }
                placeholder="أدخل اسم الوردية (مثل 'نهار' أو 'ليل')"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700"
              >
                وقت البدء
              </Label>
              <Input
                id="startTime"
                type="time"
                value={newShift.startTime || ""}
                onChange={(e) =>
                  setNewShift({ ...newShift, startTime: e.target.value })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700"
              >
                وقت الانتهاء
              </Label>
              <Input
                id="endTime"
                type="time"
                value={newShift.endTime || ""}
                onChange={(e) =>
                  setNewShift({ ...newShift, endTime: e.target.value })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddShift}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
