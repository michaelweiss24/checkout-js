import { FieldProps } from 'formik';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import { TranslatedString } from '@bigcommerce/checkout/locale';

import { Fieldset, FormField, Label, Legend, TextInput } from '../ui/form';

// const callToActionStyle: React.CSSProperties = {
//         margin: "1rem"
//     };

const OrderComments: FunctionComponent = () => {
    const renderLabel = useCallback(
        (name) => (
            <Label hidden htmlFor={name}>
                <TranslatedString id="shipping.order_comment_label" />
            </Label>
        ),
        [],
    );

    const renderInput = useCallback(
        ({ field }: FieldProps) => <TextInput {...field} autoComplete="off" maxLength={2000} />,
        [],
    );

    const legend = useMemo(
        () => (
            <div>
                <div className='optimizedCheckout-callToAction'>
                Provide specific details about your inquiry below, such as whether you need technical data, a price quote, or other relevant information.
                </div>
                <Legend>
                    <TranslatedString id="shipping.order_comment_label" />
                </Legend>
            </div>
        ),
        [],
    );

    return (
        <Fieldset legend={legend} testId="checkout-shipping-comments">
            <FormField
                id="orderComment"
                input={renderInput}
                label={renderLabel}
                name="orderComment"
            />
        </Fieldset>
    );
};

export default OrderComments;
