import Address from "../../models/Address.js";

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone) {
      return res.status(400).json({
        success: false,
        message: "userId, address, city, pincode and phone are required",
      });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes: notes || "",
    });
    await newAddress.save();
    res.status(200).json({
      success: true,
      data: newAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add address",
      error: error.message,
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const addressList = await Address.find({ userId });
    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch address",
      error: error.message,
    });
  }
};

const editAllAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
    if (!addressId || !userId) {
      return res.status(400).json({
        success: false,
        message: "AddressId and userId are required",
      });
    }
    const updatedAddress = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      {
        $set: formData,

      },
      {
        new: true,
      },
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to edit address",
      error: error.message,
    });
  }
};

const deleteAllAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!addressId || !userId) {
      return res.status(400).json({
        success: false,
        message: "AddressId and userId are required",
      });
    }
    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });
    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete address",
      error: error.message,
    });
  }
};

export { addAddress, fetchAllAddress, editAllAddress, deleteAllAddress };
