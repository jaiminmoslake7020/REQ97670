const Staff = require('./../models/Staff');

const addStaff = async (staff) => {
  const modal = new Staff(staff);
  try {
    return await modal.save();
  } catch (e) {
    console.log(e);
    return Promise.resolve({
      error: "Saving Staff Failed."
    });
  }
}

{/* User Story 2 */}
const updateStaff = async (id, staffNew) => {
  try {
    const staff = await Staff.findByPk(id);
    if (staff) {
      staff.set(staffNew)
      try {
        return await staff.save();
      } catch (e) {
        console.log(e);
        return Promise.resolve({
          error: "Updating Staff Failed."
        });
      }
    } else {
      return Promise.resolve({
        error: "Requested Staff Not exists.",
        statusCode: 404
      });
    }
  } catch (e) {
    console.log(e);
    return Promise.resolve({
      error: "Getting Staff to update process failed."
    });
  }
}

const deleteStaff = async (id) => {
  try {
    const staff = await Staff.findByPk(id);
    if (staff) {
      try {
        return await staff.destroy();
      } catch (e) {
        console.log(e);
        return Promise.resolve({
          error: "Deleting Staff Failed."
        });
      }
    } else {
      return Promise.resolve({
        error: "Requested staff empty for delete.",
        statusCode: 404
      });
    }
  } catch (e) {
    console.log(e);
    return Promise.resolve({
      error: "Getting Staff to delete process failed."
    });
  }
}

module.exports = {
  addStaff, updateStaff, deleteStaff
};
