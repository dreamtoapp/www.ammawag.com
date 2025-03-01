"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/provider/pusherContext";
import { BellIcon, Mail, ShoppingCart, Trash2, X } from "lucide-react";

export default function NotificationsDialog() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    removeNotification,
    clearAllNotifications,
  } = useNotifications();

  const getIcon = (type: string) => {
    const iconClass = "h-4 w-4";
    return {
      message: <Mail className={iconClass} />,
      order: <ShoppingCart className={iconClass} />,
    }[type];
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative cursor-pointer">
          <BellIcon className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </div>
          )}
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md p-0 rounded-lg">
        <div className="p-4 border-b flex justify-between items-center bg-muted/50">
          <DialogTitle className="text-lg font-semibold">الإشعارات</DialogTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllNotifications}
              className="text-red-600 hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              حذف الكل
            </Button>
            <DialogTrigger>
              <X className="h-5 w-5 text-muted-foreground" />
            </DialogTrigger>
          </div>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "group flex items-start gap-3 p-4 relative",
                  "hover:bg-muted/20 transition-colors",
                  !notification.read && "bg-background"
                )}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNotification(notification.id);
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <span className="shrink-0 mt-1 text-muted-foreground">
                  {getIcon(notification.type)}
                </span>

                <div
                  className="flex-1"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{notification.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.content}
                  </p>
                  {notification.type === "order" && (
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {notification.metadata?.itemsCount} عنصر
                      </span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        {notification.metadata?.totalAmount} ر.س
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {notifications.length === 0 && (
              <div className="p-6 text-center text-muted-foreground">
                لا توجد إشعارات جديدة
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
