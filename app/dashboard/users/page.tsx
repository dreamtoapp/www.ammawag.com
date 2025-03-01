"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getUsers,
  updateUser,
  deleteUser,
  type UserWithOrders,
} from "./action/actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Eye, Trash } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState<UserWithOrders[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserWithOrders | null>(null);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("ALL"); // Default to "ALL"
  const [dialogType, setDialogType] = useState<
    "view" | "edit" | "delete" | null
  >(null);

  // جلب المستخدمين
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers(search, role === "ALL" ? "" : role);
      setUsers(data);
    };
    fetchUsers();
  }, [search, role]);

  // التعامل مع الحذف
  const handleDelete = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser.id);
      const updatedUsers = await getUsers(search, role === "ALL" ? "" : role);
      setUsers(updatedUsers);
      setDialogType(null);
    }
  };

  // التعامل مع حفظ التعديلات
  const handleEditSave = async (updatedUser: UserWithOrders) => {
    await updateUser(updatedUser.id, updatedUser);
    const updatedUsers = await getUsers(search, role === "ALL" ? "" : role);
    setUsers(updatedUsers);
    setDialogType(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">إدارة المستخدمين</h1>

      {/* الفلاتر */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="ابحث بالهاتف، الاسم، أو الإيميل"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger>
            <SelectValue placeholder="تصفية حسب النوع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">جميع الأنواع</SelectItem>
            <SelectItem value="ADMIN">مدير</SelectItem>
            <SelectItem value="USER">مستخدم</SelectItem>
            <SelectItem value="GUEST">زائر</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* جدول المستخدمين */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">الجوال</TableHead>
            <TableHead className="text-right">الاسم</TableHead>
            <TableHead className="text-right">الإيميل</TableHead>
            <TableHead className="text-right">النوع</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="flex gap-3 items-center justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedUser(user);
                    setDialogType("view");
                  }}
                >
                  <Eye size={16} />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedUser(user);
                    setDialogType("edit");
                  }}
                >
                  <Edit size={16} />
                </Button>
                {/* <Button
                  variant="destructive"
                  onClick={() => {
                    setSelectedUser(user);
                    setDialogType("delete");
                  }}
                >
                  <Trash size={16} />
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* النافذة المنبثقة */}
      <Dialog open={!!dialogType} onOpenChange={() => setDialogType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "view" && "تفاصيل المستخدم"}
              {dialogType === "edit" && "تعديل المستخدم"}
              {dialogType === "delete" && "حذف المستخدم"}
            </DialogTitle>
          </DialogHeader>

          {dialogType === "view" && selectedUser && (
            <div className="space-y-4">
              <DetailItem label="الجوال" value={selectedUser.phone} />
              <DetailItem label="الاسم" value={selectedUser.name} />
              <DetailItem label="الإيميل" value={selectedUser.email} />
              <DetailItem label="العنوان" value={selectedUser.address} />
              <DetailItem label="النوع" value={selectedUser.role} />
              <DetailItem
                label="تفعيل OTP"
                value={selectedUser.isOtp ? "نعم" : "لا"}
              />
              <DetailItem
                label="الموقع"
                value={`${selectedUser.latitude}, ${selectedUser.longitude}`}
              />
              <div>
                <h3 className="font-semibold mb-2">
                  الطلبات ({selectedUser?.orders?.length || 0})
                </h3>
                <ScrollArea className="h-32 w-full rounded-md border p-4">
                  {selectedUser?.orders?.map((order) => (
                    <div key={order.id} className="mb-2">
                      {order.orderNumber} - {order.status}
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
          )}

          {dialogType === "edit" && selectedUser && (
            <EditUserForm
              user={selectedUser}
              onSave={handleEditSave}
              onClose={() => setDialogType(null)}
            />
          )}

          {dialogType === "delete" && (
            <div className="space-y-4">
              <p>هل أنت متأكد من رغبتك في حذف هذا المستخدم؟</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogType(null)}>
                  إلغاء
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  حذف
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// نموذج تعديل المستخدم
function EditUserForm({
  user,
  onSave,
  onClose,
}: {
  user: UserWithOrders;
  onSave: (user: UserWithOrders) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label>الجوال</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label>الاسم</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label>الإيميل</label>
            <Input
              name="email"
              value={formData.email ?? "لا يوجد إيميل"}
              onChange={handleChange}
              type="email"
            />
          </div>
          <div className="space-y-2">
            <label>العنوان</label>
            <Input
              name="address"
              value={formData.address ?? "لا يوجد عنوان"}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label>النوع</label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">مدير</SelectItem>
                <SelectItem value="USER">مستخدم</SelectItem>
                <SelectItem value="GUEST">زائر</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label>تفعيل OTP</label>
            <input
              type="checkbox"
              name="isOtp"
              checked={formData.isOtp}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label>خط العرض</label>
            <Input
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label>خط الطول</label>
            <Input
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </div>
        </div>
      </ScrollArea>

      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          إلغاء
        </Button>
        <Button type="submit">حفظ</Button>
      </div>
    </form>
  );
}

// عنصر تفاصيل
function DetailItem({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <strong>{label}:</strong> {value || "-"}
    </div>
  );
}
