export const validateRegister = (name, phone, username, password) => {
  const errors = {};
  const nameRegex = /^[A-Za-z\u0600-\u06FF ]+$/;

  // الاسم
  if (!name.trim()) {
    errors.name = "الاسم مطلوب";
  } else if (!nameRegex.test(name)) {
    errors.name = "الاسم يجب أن يحتوي على حروف فقط";
  }

  // رقم الجوال (10 أرقام)
  const phoneRegex = /^[0-9]{10}$/;
  if (!phone.trim()) {
    errors.phone = "رقم الجوال مطلوب";
  } else if (!phoneRegex.test(phone)) {
    errors.phone = "رقم الجوال يجب أن يكون 10 أرقام";
  }

  // اسم المستخدم
  if (!username.trim()) {
    errors.username = "اسم المستخدم مطلوب";
  } else if (username.length < 3) {
    errors.username = "اسم المستخدم يجب أن يكون 3 أحرف على الأقل";
  }

  // كلمة المرور
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  if (!password.trim()) {
    errors.password = "كلمة المرور مطلوبة";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "كلمة المرور يجب أن تكون بين 8-20 حرفًا وتحتوي على حرف صغير و كبير ورقم";
  }

  return errors;
};

export const validateLogin = (username, password) => {
  const errors = {};

  if (!username.trim()) {
    errors.username = "اسم المستخدم مطلوب";
  }

  if (!password.trim()) {
    errors.password = "كلمة السر مطلوبة";
  }

  return errors;
};

export const validateForgetPassword = (newPassword, confirmPassword) => {
  const errors = {};

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  // كلمة السر الجديدة
  if (!newPassword.trim()) {
    errors.newPassword = "كلمة السر الجديدة مطلوبة";
  } else if (!passwordRegex.test(newPassword)) {
    errors.newPassword =
      "كلمة المرور يجب أن تكون بين 8-20 حرفًا وتحتوي على حرف صغير و كبير ورقم";
  }

  // تأكيد كلمة السر
  if (!confirmPassword.trim()) {
    errors.confirmPassword = "تأكيد كلمة السر مطلوب";
  } else if (newPassword !== confirmPassword) {
    errors.confirmPassword = "كلمتا السر غير متطابقتين";
  }

  return errors;
};
export const validatePhoneOnly = (phone) => {
  const errors = {};

  const safePhone = (phone ?? "").trim();
  const phoneRegex = /^[0-9]{10}$/;

  if (!safePhone) {
    errors.phone = "رقم الجوال مطلوب";
  } else if (!phoneRegex.test(safePhone)) {
    errors.phone = "رقم الجوال يجب أن يكون 10 أرقام";
  }

  return errors;
};
    