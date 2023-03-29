import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Category } from "shared/models/category/Category";
import { ProductType } from "shared/models/category/ProductType";
import { Designer } from "shared/models/designer/Designer";
import { OrderStatus } from "shared/models/enums/OrderStatus";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "./orderTableFilters.scss";

export interface Props {
    categories: Category[];
    designers: Designer[];
    statusSelect: OrderStatus;
    typeSelect: ProductType;
    categorySelect: string;
    designerSelect: string;
    setStatusSelect: (e: OrderStatus) => void;
    setTypeSelect: (e: ProductType) => void;
    setDesignerSelect: (e: string) => void;
    setCategorySelect: (e: string) => void;
    onUpdateFilters: () => void;
    setTo: (e: Date) => void;
    setFrom: (e: Date) => void;
}

export const OrderTableFilters = (props: Props) => {
    const { categories, designers, statusSelect, typeSelect, categorySelect, designerSelect, setTo, setFrom,
        setStatusSelect, setTypeSelect, setDesignerSelect, setCategorySelect, onUpdateFilters } = props;

    const [values, setValues] = useState([
        new DateObject().subtract(4, "days"),
        new DateObject().add(4, "days")
    ])

    const setDate = (chosenDates: DateObject | DateObject[]) => {
        const dates = chosenDates as DateObject[];
        if (dates.length == 1) {
            setFrom(dates[0].toDate());
            setTo(dates[0].toDate());
        } else {
            setFrom(dates[0].toDate());
            setTo(dates[1].toDate());
        }
    }

    return (
        <>
            <InputGroup className="mb-3 align-items-end">
                <div className="d-flex filtresAdminPage__products">
                    <div>
                        <span>Замовлення</span>
                        <Form.Select as="select" value={statusSelect} onChange={(e) => setStatusSelect(+e.target.value)}>
                            <option key={OrderStatus.None} value={OrderStatus.None} >Без фільтру</option>
                            <option key={OrderStatus.Created} value={OrderStatus.Created} >Створено</option>
                            <option key={OrderStatus.VerifiedByTheBrand} value={OrderStatus.VerifiedByTheBrand} >Підтверджено брендом</option>
                            <option key={OrderStatus.AwaitingPayment} value={OrderStatus.AwaitingPayment} >Очікує оплати</option>
                            <option key={OrderStatus.ReadyToShip} value={OrderStatus.ReadyToShip} >Готовий до відправки</option>
                            <option key={OrderStatus.Sent} value={OrderStatus.Sent} >Відправлено</option>
                            <option key={OrderStatus.Received} value={OrderStatus.Received} >Отримано</option>
                            <option key={OrderStatus.AReturnIsExpected} value={OrderStatus.AReturnIsExpected} >Очікується повернення</option>
                            <option key={OrderStatus.Return} value={OrderStatus.Return} >Повернення</option>
                            <option key={OrderStatus.Cancel} value={OrderStatus.Cancel} >Відміна</option>
                            <option key={OrderStatus.Test} value={OrderStatus.Test} >Тест</option>
                        </Form.Select>
                    </div>

                    <div>
                        <span>Тип</span>
                        <Form.Select as="select" value={typeSelect} onChange={(e) => setTypeSelect(+e.target.value)} className="filtresAdminPage__filtres">
                            <option key={ProductType.None} value={ProductType.None} >Без фільтру</option>
                            <option key={ProductType.Clothes} value={ProductType.Clothes} >Clothes</option>
                            <option key={ProductType.Shose} value={ProductType.Shose} >Shose</option>
                            <option key={ProductType.Accessories} value={ProductType.Accessories} >Accessories</option>
                        </Form.Select>
                    </div>

                    <div>
                        <span>Категорія</span>
                        <Form.Select as="select" value={categorySelect} onChange={(e) => setCategorySelect(e.target.value)} className="filtresAdminPage__filtres">
                            <option key="" value="" >Без фільтру</option>
                            {categories.map(item => {
                                return <option key={item.id} value={item.id} >{item.name}</option>
                            })}
                        </Form.Select>
                    </div>

                    <div>
                        <span>Бренд</span>
                        <Form.Select as="select" value={designerSelect} onChange={(e) => setDesignerSelect(e.target.value)} className="filtresAdminPage__filtres">
                            <option key="" value="" >Без фільтру</option>
                            {designers.map(item => {
                                return <option key={item.id} value={item.id} >{`${item.firstName} ${item.lastName}`}</option>
                            })}
                        </Form.Select>
                    </div>

                    <div className="pt-4 calendar">
                        <DatePicker
                            range
                            value={values}
                            onChange={dateObject => {
                                setDate(dateObject!)
                            }}
                        />
                    </div>

                    <div className="pt-4">
                        <Button variant="outline-secondary" onClick={() => onUpdateFilters()} >Filter</Button>
                    </div>
                </div>
            </InputGroup>
        </>
    )
}