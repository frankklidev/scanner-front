import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ColumnProps } from "primereact/column";
import { CrudLayout } from "../../shared/layouts";
import { FormUser } from "../components/FormUser";
import { TablesEnums } from "../../shared/enums";
import { useSelector } from "react-redux";
import { usersSelector } from "../redux";
import { useAppDispatch } from "../../app/store";
import { getUsers } from "../redux/index";
import { IUser } from "../types/index";
import { ActionBodyTemplate } from "../../app/components/ActionBodyTemplate";

export const Users = () => {
  const disptach = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { users, loadingUsers } = useSelector(usersSelector);

  useEffect(() => {
    if (!location.pathname.includes("create")) disptach(getUsers({}));
  }, [disptach, location]);

  const column: ColumnProps[] = [
    {
      field: "user_name",
      header: "User Name",
      sortable: true,
    },
    {
      field: "FullName",
      header: "FullName",
      sortable: true,
    },
    {
      field: "actions",
      header: "Actions",
      body: (data: IUser) => (
        <ActionBodyTemplate
          onEdit={() => navigate(`/dashboard/users/${data.id}/edit`)}
          onDelete={() => {
            
          }}
        />
      ),
    },
  ];

  return (
    <CrudLayout
      showloading={loadingUsers}
      update={{
        updateForm: <FormUser />,
        updateFormTitle: "Update user",
      }}
      create={{
        createForm: <FormUser />,
        createFormTitle: "Create user",
      }}
      list={{
        titleHeaderTable: "Users",
        typeHeaderTabe: TablesEnums.users,

        loading: loadingUsers,
        columsTable: column,
        value: users,
      }}
    />
  );
};
