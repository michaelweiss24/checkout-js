import React, { 
    FunctionComponent, 
    // memo, 
    // ReactNode, 
    // useCallback 
} from 'react';
import EmailField from './EmailField';
import { 
    // BasicFormField, 
    Fieldset, 
    // Form, 
    Legend 
} from '../ui/form';
import { 
    TranslatedString, 
    // withLanguage, 
    // WithLanguageProps 
} from '@bigcommerce/checkout/locale';
import { Customer } from '@bigcommerce/checkout-sdk';
import { CustomerSignOutEvent } from './CustomerInfo';

interface CustomerReviewProps {
    email: string | undefined;
    isFloatingLabelEnabled?: boolean;
    onChangeEmail(email: string): void;
    onSignout: (event: CustomerSignOutEvent) => void;
    customer: Customer;
    // onEdit: () => void;
    // onLogout: () => void;
}

const CustomerReview: FunctionComponent<CustomerReviewProps> = ({
        // email,
        isFloatingLabelEnabled,
        onChangeEmail,
        // customer,
        // onSignout,

        // onEdit,
        // onLogout 
    }) => {
    return (
        <Fieldset
                legend={
                    <Legend hidden>
                        <TranslatedString id="customer.guest_customer_text" />
                    </Legend>
                }
            >
            <div className="customerEmail-container">
                <EmailField isFloatingLabelEnabled={isFloatingLabelEnabled} onChange={onChangeEmail}/>
                <button>Edit</button>
                {/* {customer && <button onClick={onSignout}>Signout</button>} */}
                {/* <button onClick={onEdit}>Edit</button> */}
                {/* <button onClick={onLogout}>Logout</button> */}
            </div>
        </Fieldset>
    );
};

export default CustomerReview;
