/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { FormikProps, withFormik } from "formik";
import StyledForm from "./form.style";
import FormControl from "../form-control";
import Input from "../input";
import Select, { SelectOption } from "../select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { useState } from "react";
import Boton from "../buttons/button/Button";

// any => generico
// interface FormValues {
//     name_sector: string;
//     num_sector: string;
// }

type OtherValues = {
    message: string;
    fields: IFieldElement[];
    dropdowns?: IDropdownElement[];
    datePicker?: IDatePickerElement[];
    logo: string;
};

const MyForm: React.FC<OtherValues & FormikProps<any>> = (props) => {
    const [startDate, setstartDate] = useState(new Date());
    const [endDate, setendtDate] = useState(new Date());

    const {
        message,
        isSubmitting,
        handleChange,
        setFieldValue,
        handleBlur,
        fields,
        dropdowns,
        datePicker,
        logo,
        values,
    } = props;

    return (
        <StyledForm>
            <div
                className="logo"
                style={{
                    flexBasis: "100%",
                    display: "flex",
                    alignContent: "center",
                }}
            >
                <img
                    src={logo}
                    alt="Logo formulario"
                    width={200}
                    style={{ margin: "auto" }}
                />
            </div>

            <h1 style={{ flexBasis: "100%" }}>{message}</h1>

            {fields.map((input: IFieldElement) => (
                // <Field
                //     key={input.name}
                //     {...input}
                //     style={{
                //         flex: "1 0 50px",
                //     }}
                <FormControl
                    key={input.name}
                    label={input.label}
                    htmlFor={input.name}
                    onBlur={handleBlur}
                >
                    <Input
                        id={input.name}
                        value={values[input.name]}
                        placeholder={input.placeholder}
                        type={input.type}
                        onChange={handleChange}
                        width="500px"
                        size="large"
                    />
                </FormControl>
            ))}

            {dropdowns?.map((select: IDropdownElement) => (
                <FormControl
                    key={select.name}
                    label={select.label}
                    htmlFor={select.name}
                    // onBlur={handleBlur}
                >
                    <Select
                        id={select.name}
                        placeholder={select.placeholder}
                        option={values[select.name]}
                        listOptions={select.options}
                        onChange={(e) => setFieldValue(select.name, e)}
                        width="500px"
                        size="large"
                    />
                </FormControl>
            ))}
            {datePicker?.map((dateFields: IDatePickerElement) => (
                <FormControl
                    key={dateFields.name.toString()}
                    label={dateFields.label}
                    htmlFor={dateFields.name.toString()}
                    // onBlur={handleBlur}
                >
                    <DatePicker
                        selected={startDate}
                        onChange={(date: any) => {
                            setstartDate(date);
                            values[dateFields.startDate] = date;
                        }}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        locale={es}
                        customInput={<Input />}
                        name={startDate.toString()}
                        placeholderText="Fecha de inicio"
                        dateFormat="dd/MM/yyyy"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(date: any) => {
                            setendtDate(date);
                            values[dateFields.endDate] = date;
                        }}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        locale={es}
                        customInput={<Input />}
                        name={endDate.toString()}
                        placeholderText="Fecha de termino"
                        dateFormat="dd/MM/yyyy"
                    />
                </FormControl>
            ))}

            {/* <Field name="name_sector" type="text" />
            <Field name="num_sector" type="number" /> */}

            <div className="buttons" style={{ flexBasis: "100%" }}>
                <Boton
                    typeButton="save"
                    backgroundColor="green"
                    disabled={isSubmitting}
                >
                    Guardar
                </Boton>
            </div>
        </StyledForm>
    );
};

export interface IFieldElement {
    label: string;
    name: string;
    placeholder?: string;
    type: "number" | "email" | "text";
}

export interface IDropdownElement {
    label: string;
    name: string;
    placeholder?: string;
    options: SelectOption[];
}

export interface IDatePickerElement {
    label: string;
    name: string;
    placeholder?: string;
    startDate: string;
    endDate: string;
}
interface InitValues {
    message: string;
    fields: IFieldElement[];
    dropdowns?: IDropdownElement[];
    datePicker?: IDatePickerElement[];
    logo: string;
}

const Form = withFormik<InitValues, any>({
    mapPropsToValues: (props) => ({
        message: props.message,
        field: props.fields,
        logo: props.logo,
        dropdowns: props.dropdowns,
        datePicker: props.datePicker,
        // name_sector: "",
        // num_sector: "",
    }),

    handleSubmit: (values) => {
        console.log(values);
    },
})(MyForm);

export default Form;
