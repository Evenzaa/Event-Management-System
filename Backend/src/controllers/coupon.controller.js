import Coupon from "../models/Coupon.js";


export const createCoupon = async (req, res, next) => {
  try {

    const coupon = await Coupon.create(req.body);

    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      data: coupon,
    });

  } catch (error) {
    next(error);
  }
};

export const getCoupons = async (req, res, next) => {
  try {

    const coupons = await Coupon.find()
      .populate("eventId", "title");

    res.json({
      success: true,
      count: coupons.length,
      data: coupons,
    });

  } catch (error) {
    next(error);
  }
};

export const deleteCoupon = async (req, res, next) => {
  try {

    const coupon = await Coupon.findById(req.params.id);


    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }
    await coupon.deleteOne();
    res.json({
      success: true,
      message: "Coupon deleted successfully",
    });


  } catch (error) {
    next(error);
  }
};


export const validateCoupon = async (req, res) => {
  try {
    const { code, eventId, totalPrice } = req.body;

    if (!code || !eventId || totalPrice == null) {
      return res.status(400).json({
        success: false,
        message: "Code, eventId and totalPrice are required",
      });
    }

    const coupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid coupon code",
      });
    }

    if (new Date() > coupon.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "Coupon expired",
      });
    }

    if (
      coupon.eventId &&
      coupon.eventId.toString() !== eventId
    ) {
      return res.status(400).json({
        success: false,
        message: "Coupon is not valid for this event",
      });
    }

    const discountAmount = (totalPrice * coupon.discount) / 100;
    const finalPrice = totalPrice - discountAmount;

    return res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      data: {
        couponCode: coupon.code,
        discount: coupon.discount,
        discountAmount,
        finalPrice,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
