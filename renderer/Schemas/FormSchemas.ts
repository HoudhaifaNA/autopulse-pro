import { object, array, string, number, date, mixed } from "yup";

export const updateUserPassword = object({
  currentPassword: string()
    .min(4, "Mot de passe doit être d'au moins 4 caractères")
    .required("Mot de passe actuel requis"),
  newPassword: string()
    .min(4, "Mot de passe doit être d'au moins 4 caractères")
    .required("Nouveau mot de passe requis"),
  confirmPassword: string()
    .test({
      name: "Password matching",
      message: "Les mots de passe ne correspondent pas",
      test: function (value) {
        return value === this.parent.newPassword;
      },
    })
    .required("Confirmation du mot de passe requise"),
});
