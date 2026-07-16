import Booking from "../models/Booking.js";
import { generateQRCode } from "../utils/qrGenerator.js";


export const payBooking = async (req, res) => {
  try {

    const { bookingId, paymentMethod } = req.body;


    const booking = await Booking.findById(bookingId);


    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }


    // update payment
    booking.paymentMethod = paymentMethod;
    booking.paymentStatus = "paid";


    // confirm ticket
    booking.status = "confirmed";


    const qr = await generateQRCode(
      booking._id.toString()
    );


    booking.qrCode = qr;


    await booking.save();



    res.status(200).json({
      success: true,
      message: "Payment successful",
      booking
    });



  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};
