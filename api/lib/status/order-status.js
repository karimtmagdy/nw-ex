exports.ORDER_STATUS = Object.freeze({
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  RETURNED: "returned",
});
// | `pending`          | تم إنشاء الطلب لكن لم يتم الدفع   |
// | `confirmed`        | تم الدفع وجاري تجهيز الطلب        |
// | `processing`       | تحت الإعداد (تغليف - تجهيز للشحن) |
// | `shipped`          | تم شحنه                           |
// | `out_for_delivery` | خرج للتوصيل                       |
// | `delivered`        | تم التوصيل بنجاح                  |
// | `cancelled`        | تم إلغاء الطلب                    |
// | `refunded`         | تم إرجاع المبلغ للعميل            |
// | `returned`         | العميل رجّع المنتج                |
