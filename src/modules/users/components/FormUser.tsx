import { FC, ReactElement, useEffect, useState } from "react";

import * as Yup from "yup";

import { Card } from "../../app/components/Card";
import { useFormik } from "formik";
import { Button } from "../../app/components/Button";
import { Input } from "../../app/components/Input";
import { Loading } from "../../app/components/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IUser } from "../types/index";
import { InputNum } from "../../app/components/InputNumber";
import { useAppDispatch } from "../../app/store/index";
import { createUser } from "../redux";
import { useSelector } from "react-redux";
import { usersSelector, getUserById } from "../redux/index";
import { showMessage } from "../../shared/redux/message";

const UserSchema = Yup.object().shape({
  user_name: Yup.string().required("Required field"),
  password: Yup.string().required("Required field"),
  fullName: Yup.string().required("Required field"),
});

export const FormUser: FC = (): ReactElement => {
  const disptach = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { loadingUsers } = useSelector(usersSelector);
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    if (userId)
      disptach(getUserById(userId))
        .unwrap()
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          disptach(
            showMessage({
              severity: "error",
              summary: error.response.data.message,
            })
          );
        });
  }, [userId]);

  const formik = useFormik<IUser>({
    initialValues: {
      user_name: user?.user_name || "",
      password: user?.password || "",
      fullname: user?.fullname || "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: UserSchema,
  });

  return (
    <div className="pt-3">
      <Loading show={loadingUsers} />
      <form>
        <Card
          style={"mx-3 shadow-3"}
          title={
            location.pathname.split("/").at(-1) === "edit"
              ? "Update user"
              : "Create user"
          }
        >
          <div className={"grid flex-row"}>
            <Input
              style="col-4"
              required
              value={formik.values.user_name}
              name={"user_name"}
              label={"User"}
              icon={"pi pi-info-circle"}
              onChange={formik.handleChange}
            />
            <Input
              style="col-4"
              required
              value={formik.values.password}
              name={"password"}
              label={"Password"}
              icon={"pi pi-info-circle"}
              onChange={formik.handleChange}
            />
            <Input
              style="col-4"
              required
              value={formik.values.fullname}
              name={"fullname"}
              label={"FullName"}
              icon={"pi pi-info-circle"}
              onChange={formik.handleChange}
            />
          </div>
        </Card>
        <div className={"grid flex-row mt-3 mr-3 justify-content-end"}>
          <Button
            type="button"
            style={"mr-3"}
            label="Finalizar"
            icon={"pi pi-check"}
            onClick={() => navigate(-1)}
          />
          <Button
            // onClick={() => console.log(formik.values)}
            onClick={() => disptach(createUser(formik.values))}
            disabled={!formik.isValid || !formik.dirty}
            type="button"
            label="Guardar"
            icon={"pi pi-save"}
          />
        </div>
      </form>
    </div>
  );
};
