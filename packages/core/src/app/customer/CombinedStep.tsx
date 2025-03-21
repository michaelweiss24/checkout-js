import {
    // CheckoutPaymentMethodExecutedOptions,
    CheckoutSelectors,
    // CustomerAccountRequestBody,
    CustomerCredentials,
    CustomError,
    // CustomerInitializeOptions,
    // CustomerRequestOptions,
    // ExecutePaymentMethodCheckoutOptions,
    // FormField,
    // GuestCredentials,
    // SignInEmail,
    StoreConfig,
} from '@bigcommerce/checkout-sdk';
import { noop } from 'lodash';
import React, { Component, ReactNode } from 'react';

import { AnalyticsContextProps } from '@bigcommerce/checkout/analytics';
import { shouldUseStripeLinkByMinimumAmount } from '@bigcommerce/checkout/instrument-utils';
import { CheckoutContextProps } from '@bigcommerce/checkout/payment-integration-api';
import { isPayPalFastlaneMethod } from '@bigcommerce/checkout/paypal-fastlane-integration';
import { CustomerSkeleton } from '@bigcommerce/checkout/ui';

import { withAnalytics } from '../analytics';
import { withCheckout } from '../checkout';
// import CheckoutStepStatus from '../checkout/CheckoutStepStatus';
import { isErrorWithType } from '../common/error';
import { isFloatingLabelEnabled } from '../common/utility';
import getProviderWithCustomCheckout from '../payment/getProviderWithCustomCheckout';
import { PaymentMethodId } from '../payment/paymentMethod';

import CheckoutButtonList from './CheckoutButtonList';
import CreateAccountForm from './CreateAccountForm';
import CustomerViewType from './CustomerViewType';
import EmailLoginForm, { EmailLoginFormValues } from './EmailLoginForm';
import { CreateAccountFormValues } from './getCreateCustomerValidationSchema';
import GuestForm, { GuestFormValues } from './GuestForm';
import LoginForm from './LoginForm';
import mapCreateAccountFromFormValues from './mapCreateAccountFromFormValues';
import StripeGuestForm from './StripeGuestForm';
import { SubscribeSessionStorage } from './SubscribeSessionStorage';

import {
    Address,
    // AddressRequestBody,
    // Cart,
    // CheckoutRequestBody,
    // Consignment,
    // ConsignmentAssignmentRequestBody,
    // Country,
    // Customer,
    // ShippingInitializeOptions,
    // ShippingRequestOptions,
} from '@bigcommerce/checkout-sdk';
import { createSelector } from 'reselect';

import { TranslatedString } from '@bigcommerce/checkout/locale';
import { AddressFormSkeleton, ConfirmationModal } from '@bigcommerce/checkout/ui';

import { isEqualAddress, mapAddressFromFormValues } from '../address';
import { EMPTY_ARRAY, isExperimentEnabled } from '../common/utility';

import { UnassignItemError } from '../shipping/errors';
import getShippableItemsCount from '../shipping/getShippableItemsCount';
import getShippingMethodId from '../shipping/getShippingMethodId';
import hasPromotionalItems from '../shipping/hasPromotionalItems';
import { MultiShippingFormValues } from '../shipping/MultiShippingForm';
import ShippingForm from '../shipping/ShippingForm';
// import ShippingHeader from '../shipping/ShippingHeader';
import { SingleShippingFormValues } from '../shipping/SingleShippingForm';
// import StripeShipping from '../shipping/stripeUPE/StripeShipping';
import { CustomerProps, WithCheckoutCustomerProps, CustomerState } from './Customer';
import { ShippingProps, WithCheckoutShippingProps, ShippingState } from '../shipping/Shipping';
// import CustomerReview from './CustomerReview'
import CustomerInfo, {
    // CustomerInfoProps,
    CustomerSignOutEvent
} from './CustomerInfo';
// import { CheckoutProps } from '../checkout/Checkout';
import { ErrorLogger } from '@bigcommerce/checkout/error-handling-utils';

// export interface ShippingProps {
//     isBillingSameAsShipping: boolean;
//     cartHasChanged: boolean;
//     isMultiShippingMode: boolean;
//     step: CheckoutStepStatus;
//     onCreateAccount(): void;
//     onToggleMultiShipping(): void;
//     onReady?(): void;
//     onUnhandledError(error: Error): void;
//     onSignIn(): void;
//     navigateNextStep(isBillingSameAsShipping: boolean): void;
// }

// export interface WithCheckoutShippingProps {
//     billingAddress?: Address;
//     cart: Cart;
//     cartHasPromotionalItems: boolean;
//     consignments: Consignment[];
//     countries: Country[];
//     countriesWithAutocomplete: string[];
//     customer: Customer;
//     customerMessage: string;
//     googleMapsApiKey: string;
//     isGuest: boolean;
//     isInitializing: boolean;
//     isLoading: boolean;
//     isShippingStepPending: boolean;
//     methodId?: string;
//     shippingAddress?: Address;
//     shouldShowMultiShipping: boolean;
//     isNewMultiShippingUIEnabled: boolean;
//     shouldShowOrderComments: boolean;
//     shouldRenderWhileLoading: boolean;
//     providerWithCustomCheckout?: string;
//     isFloatingLabelEnabled?: boolean;
//     validateGoogleMapAutoCompleteMaxLength: boolean;
//     validateAddressFields: boolean;
//     assignItem(consignment: ConsignmentAssignmentRequestBody): Promise<CheckoutSelectors>;
//     deinitializeShippingMethod(options: ShippingRequestOptions): Promise<CheckoutSelectors>;
//     deleteConsignments(): Promise<Address | undefined>;
//     getFields(countryCode?: string): FormField[];
//     initializeShippingMethod(options: ShippingInitializeOptions): Promise<CheckoutSelectors>;
//     loadShippingAddressFields(): Promise<CheckoutSelectors>;
//     loadBillingAddressFields(): Promise<CheckoutSelectors>;
//     loadShippingOptions(): Promise<CheckoutSelectors>;
//     signOut(options?: CustomerRequestOptions): void;
//     createCustomerAddress(address: AddressRequestBody): Promise<CheckoutSelectors>;
//     unassignItem(consignment: ConsignmentAssignmentRequestBody): Promise<CheckoutSelectors>;
//     updateBillingAddress(address: Partial<Address>): Promise<CheckoutSelectors>;
//     updateCheckout(payload: CheckoutRequestBody): Promise<CheckoutSelectors>;
//     updateShippingAddress(address: Partial<Address>): Promise<CheckoutSelectors>;
//     shouldRenderStripeForm: boolean;
// }

// export interface CustomerProps {
//     viewType: CustomerViewType;
//     step: CheckoutStepStatus;
//     isEmbedded?: boolean;
//     isSubscribed: boolean;
//     isWalletButtonsOnTop: boolean;
//     checkEmbeddedSupport?(methodIds: string[]): void;
//     onChangeViewType?(viewType: CustomerViewType): void;
//     onAccountCreated?(): void;
//     onContinueAsGuest?(): void;
//     onContinueAsGuestError?(error: Error): void;
//     onReady?(): void;
//     onSubscribeToNewsletter(subscribe: boolean): void;
//     onSignIn?(): void;
//     onSignInError?(error: Error): void;
//     onUnhandledError?(error: Error): void;
//     onWalletButtonClick?(methodName: string): void;
// }

// export interface WithCheckoutCustomerProps {
//     canSubscribe: boolean;
//     customerAccountFields: FormField[];
//     checkoutButtonIds: string[];
//     defaultShouldSubscribe: boolean;
//     email?: string;
//     firstName?: string;
//     fixNewsletterCheckboxExperimentEnabled: boolean;
//     forgotPasswordUrl: string;
//     isContinuingAsGuest: boolean;
//     isCreatingAccount: boolean;
//     isExecutingPaymentMethodCheckout: boolean;
//     isGuestEnabled: boolean;
//     hasBillingId: boolean;
//     isInitializing: boolean;
//     isSendingSignInEmail: boolean;
//     isSignInEmailEnabled: boolean;
//     isSigningIn: boolean;
//     privacyPolicyUrl?: string;
//     providerWithCustomCheckout?: string;
//     requiresMarketingConsent: boolean;
//     signInEmail?: SignInEmail;
//     signInEmailError?: Error;
//     isAccountCreationEnabled: boolean;
//     isPaymentDataRequired: boolean;
//     createAccountError?: Error;
//     signInError?: Error;
//     isFloatingLabelEnabled?: boolean;
//     isExpressPrivacyPolicy: boolean;
//     clearError(error: Error): Promise<CheckoutSelectors>;
//     continueAsGuest(credentials: GuestCredentials): Promise<CheckoutSelectors>;
//     deinitializeCustomer(options: CustomerRequestOptions): Promise<CheckoutSelectors>;
//     executePaymentMethodCheckout(
//         options: ExecutePaymentMethodCheckoutOptions,
//     ): Promise<CheckoutSelectors>;
//     initializeCustomer(options: CustomerInitializeOptions): Promise<CheckoutSelectors>;
//     sendLoginEmail(params: { email: string }): Promise<CheckoutSelectors>;
//     signIn(credentials: CustomerCredentials): Promise<CheckoutSelectors>;
//     createAccount(values: CustomerAccountRequestBody): Promise<CheckoutSelectors>;
//     shouldRenderStripeForm: boolean;
// }

// interface ShippingState {
//     isInitializing: boolean;
//     isMultiShippingUnavailableModalOpen: boolean;
// }

// export interface CustomerState {
//     isEmailLoginFormOpen: boolean;
//     isReady: boolean;
//     hasRequestedLoginEmail: boolean;
// }

export interface CombinedState extends ShippingState, CustomerState {
    isContinuingAsGuest : boolean;
    isCartEmpty : boolean;
}

export interface CustomCombinedProps {
    loginUrl: string;
    cartUrl: string;
    isPriceHiddenFromGuests: boolean;
    isCartEmpty: boolean;
    onSignOut?: ((event: CustomerSignOutEvent) => void);
    onSignOutError?: ((error: CustomError) => void);
    // checkoutId: string;
    // containerId: string;
    // embeddedStylesheet: EmbeddedCheckoutStylesheet;
    // embeddedSupport: CheckoutSupport;
    errorLogger: ErrorLogger;
    // createEmbeddedMessenger(options: EmbeddedCheckoutMessengerOptions): EmbeddedCheckoutMessenger;
}

const deleteConsignmentsSelector = createSelector(
    ({ checkoutService: { deleteConsignment } }: CheckoutContextProps) => deleteConsignment,
    ({ checkoutState: { data } }: CheckoutContextProps) => data.getConsignments(),
    (deleteConsignment, consignments) => async () => {
        if (!consignments || !consignments.length) {
            return;
        }

        const [{ data }] = await Promise.all(consignments.map(({ id }) => deleteConsignment(id)));

        return data.getShippingAddress();
    },
);

class CombinedStep extends Component<CustomerProps & WithCheckoutCustomerProps & AnalyticsContextProps & ShippingProps & WithCheckoutShippingProps & CustomCombinedProps, CombinedState> {
    state: CombinedState = {
        isEmailLoginFormOpen: false,
        isReady: false,
        hasRequestedLoginEmail: false,
        isInitializing: true,
        isMultiShippingUnavailableModalOpen: false,
        isContinuingAsGuest: false,
        isCartEmpty: false
    };

    private draftEmail?: string;

    async componentDidMount(): Promise<void> {
        const {
            initializeCustomer,
            email,
            onReady = noop,
            onUnhandledError = noop,
            providerWithCustomCheckout,
            loadShippingAddressFields,
            loadBillingAddressFields,
            loadShippingOptions,
            cartHasPromotionalItems,
            isMultiShippingMode,
            isNewMultiShippingUIEnabled,
        } = this.props;

        this.draftEmail = email;

        try {
            if (providerWithCustomCheckout && providerWithCustomCheckout !== PaymentMethodId.StripeUPE) {
                await initializeCustomer({methodId: providerWithCustomCheckout});
            }
            
            await Promise.all([loadShippingAddressFields(), loadShippingOptions(), loadBillingAddressFields()]);

            if(cartHasPromotionalItems && isMultiShippingMode && isNewMultiShippingUIEnabled) {
                this.setState({ isMultiShippingUnavailableModalOpen: true });
            }
        } catch (error) {
            onUnhandledError(error);
        } finally {
            this.setState({ isInitializing: false, isReady: true })
        }

        onReady();
    }

    async componentWillUnmount(): Promise<void> {
        const {
            deinitializeCustomer = noop,
            providerWithCustomCheckout,
            onUnhandledError = noop
        } = this.props;

        try {
            await deinitializeCustomer({ methodId: providerWithCustomCheckout });
        } catch (error) {
            onUnhandledError(error);
        }
    }

    render(): ReactNode {
        const {
            viewType,
            isBillingSameAsShipping,
            isGuest,
            shouldShowMultiShipping,
            isNewMultiShippingUIEnabled,
            validateGoogleMapAutoCompleteMaxLength,
            validateAddressFields,
            customer,
            updateShippingAddress,
            initializeShippingMethod,
            deinitializeShippingMethod,
            isMultiShippingMode,
            step,
            isFloatingLabelEnabled,
            shouldRenderStripeForm,
            shouldRenderWhileLoading,
            cartHasPromotionalItems,
            ...shippingFormProps
        } = this.props;

        const { isEmailLoginFormOpen,
            isReady,
            isInitializing,
            isMultiShippingUnavailableModalOpen
        } = this.state;
        const shouldRenderGuestForm = viewType === CustomerViewType.Guest;
        const shouldRenderCreateAccountForm = viewType === CustomerViewType.CreateAccount;
        const shouldRenderReview = viewType === CustomerViewType.Review;
        const shouldRenderLoginForm = !shouldRenderGuestForm && !shouldRenderCreateAccountForm && !shouldRenderReview;
        // const shouldRenderTestForm = false;

        const handleSwitchToSingleShipping = async () => {
            this.setState({ isMultiShippingUnavailableModalOpen: false });
            await this.handleMultiShippingModeSwitch();
        }
        // const shouldRenderAddressForm = false;

        return (
            <>
                <CustomerSkeleton isLoading={!isReady}>
                    {isEmailLoginFormOpen && this.renderEmailLoginLinkForm()}
                    {shouldRenderLoginForm && this.renderLoginForm()}
                    {shouldRenderGuestForm && this.renderGuestForm()}
                    {shouldRenderReview && this.renderReview()}
                    {shouldRenderCreateAccountForm && this.renderCreateAccountForm()}
                </CustomerSkeleton>
                <AddressFormSkeleton isLoading={isInitializing} renderWhileLoading={shouldRenderWhileLoading}>
                    <div className="checkout-form">
                        <ConfirmationModal 
                            action={handleSwitchToSingleShipping}
                            actionButtonLabel={<TranslatedString id="common.ok_action" />}
                            headerId="shipping.multishipping_unavailable_action"
                            isModalOpen={isMultiShippingUnavailableModalOpen}
                            messageId="shipping.checkout_switched_to_single_shipping"
                            shouldShowCloseButton={false}
                        />
                        {/* <ShippingHeader
                            cartHasPromotionalItems={cartHasPromotionalItems}
                            isGuest={isGuest}
                            isMultiShippingMode={isMultiShippingMode}
                            isNewMultiShippingUIEnabled={isNewMultiShippingUIEnabled}
                            onMultiShippingChange={this.handleMultiShippingModeSwitch}
                            shouldShowMultiShipping={shouldShowMultiShipping}
                        /> */}
                        <ShippingForm
                            {...shippingFormProps}
                            addresses={customer.addresses}
                            deinitialize={deinitializeShippingMethod}
                            initialize={initializeShippingMethod}
                            isBillingSameAsShipping={isBillingSameAsShipping}
                            isFloatingLabelEnabled={isFloatingLabelEnabled}
                            isGuest={isGuest}
                            isInitialValueLoaded={shouldRenderWhileLoading ? !isInitializing : true}
                            isMultiShippingMode={isMultiShippingMode}
                            isNewMultiShippingUIEnabled={isNewMultiShippingUIEnabled}
                            onMultiShippingSubmit={this.handleMultiShippingSubmit}
                            onSingleShippingSubmit={this.handleSingleShippingSubmit}
                            onUseNewAddress={this.handleUseNewAddress}
                            shouldShowSaveAddress={!isGuest}
                            updateAddress={updateShippingAddress}
                            validateAddressFields={validateAddressFields}
                            validateGoogleMapAutoCompleteMaxLength={validateGoogleMapAutoCompleteMaxLength}
                        />
                    </div>
                </AddressFormSkeleton>
            </>
        );
    }
    renderReview(): React.ReactNode {
        const {
            onSignOut,
            onSignOutError,
        } = this.props;

        const divStyle: React.CSSProperties = {
            margin: '10px',
            padding: '10px',
          };
        
        return (
            <>
                <CustomerInfo
                    onSignOut={onSignOut}
                    onSignOutError={onSignOutError}
                />
                <div style={divStyle}></div>
            </> 
            
            // <CustomerReview 
            //     email={email}
            //     isFloatingLabelEnabled = {isFloatingLabelEnabled}
            //     onChangeEmail = {this.handleChangeEmail}
            //     onSignout={this.handleSignOut}
            //     customer={customer}
                
            //     // onEdit={onEdit}
            //     // onLogout={onLogout}
            // />
        );
    }

    // private renderAddressForm(): ReactNode {

    // }

    private renderGuestForm(): ReactNode {
        const {
            canSubscribe,
            checkEmbeddedSupport,
            checkoutButtonIds,
            deinitializeCustomer,
            email,
            initializeCustomer,
            // isGuest,
            isContinuingAsGuest = false,
            isExecutingPaymentMethodCheckout = false,
            isInitializing = false,
            isSubscribed,
            isWalletButtonsOnTop,
            privacyPolicyUrl,
            requiresMarketingConsent,
            onUnhandledError = noop,
            onWalletButtonClick = noop,
            step,
            isFloatingLabelEnabled,
            isExpressPrivacyPolicy,
            isPaymentDataRequired,
            shouldRenderStripeForm,
            providerWithCustomCheckout,
        } = this.props;

        const checkoutButtons = isWalletButtonsOnTop || !isPaymentDataRequired
          ? null
          : <CheckoutButtonList
            checkEmbeddedSupport={checkEmbeddedSupport}
            deinitialize={deinitializeCustomer}
            initialize={initializeCustomer}
            isInitializing={isInitializing}
            methodIds={checkoutButtonIds}
            onClick={onWalletButtonClick}
            onError={onUnhandledError}
          />;

        const isLoadingGuestForm = isContinuingAsGuest || isExecutingPaymentMethodCheckout;

        return (
            shouldRenderStripeForm ?
                <StripeGuestForm
                    canSubscribe={canSubscribe}
                    checkoutButtons={checkoutButtons}
                    continueAsGuestButtonLabelId="customer.continue"
                    defaultShouldSubscribe={isSubscribed}
                    deinitialize={deinitializeCustomer}
                    email={this.draftEmail || email}
                    initialize={initializeCustomer}
                    isExpressPrivacyPolicy={isExpressPrivacyPolicy}
                    isLoading={isContinuingAsGuest || isInitializing || isExecutingPaymentMethodCheckout}
                    onChangeEmail={this.handleChangeEmail}
                    onContinueAsGuest={this.handleContinueAsGuest}
                    onShowLogin={this.handleShowLogin}
                    privacyPolicyUrl={privacyPolicyUrl}
                    requiresMarketingConsent={requiresMarketingConsent}
                    step={step}
                />
                :
            <GuestForm
                canSubscribe={canSubscribe}
                checkoutButtons={checkoutButtons}
                continueAsGuestButtonLabelId="customer.continue"
                defaultShouldSubscribe={isSubscribed}
                email={this.draftEmail || email}
                isExpressPrivacyPolicy={isExpressPrivacyPolicy}
                isFloatingLabelEnabled={isFloatingLabelEnabled}
                isLoading={isLoadingGuestForm}
                onChangeEmail={this.handleChangeEmail}
                onContinueAsGuest={this.handleContinueAsGuest}
                onShowLogin={this.handleShowLogin}
                privacyPolicyUrl={privacyPolicyUrl}
                shouldShowEmailWatermark={isPayPalFastlaneMethod(providerWithCustomCheckout)}
                requiresMarketingConsent={requiresMarketingConsent}
            />
        );
    }

    private renderEmailLoginLinkForm(): ReactNode {
        const { isEmailLoginFormOpen, hasRequestedLoginEmail } = this.state;

        const { isSendingSignInEmail, signInEmailError, signInEmail, isFloatingLabelEnabled } =
            this.props;

        return (
            <EmailLoginForm
                email={this.draftEmail}
                emailHasBeenRequested={hasRequestedLoginEmail}
                isFloatingLabelEnabled={isFloatingLabelEnabled}
                isOpen={isEmailLoginFormOpen}
                isSendingEmail={isSendingSignInEmail}
                onRequestClose={this.closeEmailLoginFormForm}
                onSendLoginEmail={this.handleSendLoginEmail}
                sentEmail={signInEmail}
                sentEmailError={signInEmailError}
            />
        );
    }

    private closeEmailLoginFormForm: () => void = () => {
        this.setState({
            isEmailLoginFormOpen: false,
            hasRequestedLoginEmail: false,
        });
    };

    private renderCreateAccountForm(): ReactNode {
        const {
            customerAccountFields,
            isExecutingPaymentMethodCheckout,
            isCreatingAccount,
            createAccountError,
            requiresMarketingConsent,
            isFloatingLabelEnabled,
            defaultShouldSubscribe,
            fixNewsletterCheckboxExperimentEnabled,
        } = this.props;

        return (
            <CreateAccountForm
                createAccountError={createAccountError}
                defaultShouldSubscribe={defaultShouldSubscribe}
                fixNewsletterCheckboxExperimentEnabled={fixNewsletterCheckboxExperimentEnabled}
                formFields={customerAccountFields}
                isCreatingAccount={isCreatingAccount}
                isExecutingPaymentMethodCheckout={isExecutingPaymentMethodCheckout}
                isFloatingLabelEnabled={isFloatingLabelEnabled}
                onCancel={this.handleCancelCreateAccount}
                onSubmit={this.handleCreateAccount}
                requiresMarketingConsent={requiresMarketingConsent}
            />
        );
    }

    private renderLoginForm(): ReactNode {
        const {
            isEmbedded,
            email,
            forgotPasswordUrl,
            isSignInEmailEnabled,
            isGuestEnabled,
            isSendingSignInEmail,
            isSigningIn,
            isExecutingPaymentMethodCheckout,
            isAccountCreationEnabled,
            providerWithCustomCheckout,
            signInError,
            isFloatingLabelEnabled,
            viewType,
        } = this.props;

        return (
            <LoginForm
                canCancel={isGuestEnabled}
                continueAsGuestButtonLabelId={
                    providerWithCustomCheckout
                        ? 'customer.continue'
                        : 'customer.continue_as_guest_action'
                }
                email={this.draftEmail || email}
                forgotPasswordUrl={forgotPasswordUrl}
                isExecutingPaymentMethodCheckout={isExecutingPaymentMethodCheckout}
                isFloatingLabelEnabled={isFloatingLabelEnabled}
                isSendingSignInEmail={isSendingSignInEmail}
                isSignInEmailEnabled={isSignInEmailEnabled && !isEmbedded}
                isSigningIn={isSigningIn}
                onCancel={this.handleCancelSignIn}
                onChangeEmail={this.handleChangeEmail}
                onContinueAsGuest={this.handleShowReview} //Change this to present the 'review' form of the email input.
                onCreateAccount={this.showCreateAccount}
                onSendLoginEmail={this.handleEmailLoginClicked}
                onSignIn={this.handleSignIn}
                shouldShowCreateAccountLink={isAccountCreationEnabled}
                signInError={signInError}
                viewType={viewType}
            />
        );
    }

    private handleEmailLoginClicked: () => void = async () => {
        const { viewType } = this.props;

        try {
            if (viewType !== CustomerViewType.Login && this.draftEmail) {
                await this.handleSendLoginEmail({ email: this.draftEmail });
            }
        } finally {
            this.setState({
                isEmailLoginFormOpen: true,
            });
        }
    };

    private handleSendLoginEmail: (values: EmailLoginFormValues) => Promise<void> = async (
        values,
    ) => {
        const { sendLoginEmail } = this.props;

        try {
            await sendLoginEmail(values);
        } catch (error) {
        // Need to write catch block since one test covers the case when `sendLoginEmail` fails
        } finally {
            this.setState({
                hasRequestedLoginEmail: true,
            });
        }
    };

    private handleContinueAsGuest: (formValues: GuestFormValues) => Promise<void> = async (
        formValues,
    ) => {
        const {
            canSubscribe,
            continueAsGuest,
            hasBillingId,
            defaultShouldSubscribe,
            onChangeViewType = noop,
            onContinueAsGuest = noop,
            onContinueAsGuestError = noop,
            onSubscribeToNewsletter,
            // isContinuingAsGuest
        } = this.props;

        const {
            isContinuingAsGuest
        } = this.state

        const email = formValues.email.trim();
        const updateSubscriptionWhenUnchecked =
            hasBillingId || defaultShouldSubscribe ? false : undefined;

        try {
            const { data } = await continueAsGuest({
                email,
                acceptsMarketingNewsletter:
                    canSubscribe && formValues.shouldSubscribe
                        ? true
                        : updateSubscriptionWhenUnchecked,
                acceptsAbandonedCartEmails: formValues.shouldSubscribe
                    ? true
                    : updateSubscriptionWhenUnchecked,
            });

            onSubscribeToNewsletter(formValues.shouldSubscribe);

            SubscribeSessionStorage.setSubscribeStatus(formValues.shouldSubscribe);

            const customer = data.getCustomer();

            const paymentProviderCustomer = data.getPaymentProviderCustomer();

            console.log("Customer.isGuest: ", customer?.isGuest)
            console.log("isContinuingAsGuest: ", isContinuingAsGuest)


            if (customer && customer.shouldEncourageSignIn && customer.isGuest && !paymentProviderCustomer?.stripeLinkAuthenticationState && !isContinuingAsGuest) {
                return onChangeViewType(CustomerViewType.SuggestedLogin);
            }

            // await this.executePaymentMethodCheckoutOrContinue();

            // onChangeViewType(CustomerViewType.Guest)

            this.draftEmail = undefined;
        } catch (error) {
            if (
                isErrorWithType(error) &&
                (error.type === 'update_subscriptions' ||
                    error.type === 'payment_method_client_invalid')
            ) {
                this.draftEmail = undefined;

                onContinueAsGuest();
            }

            if (isErrorWithType(error) && error.status === 429) {
                return onChangeViewType(CustomerViewType.EnforcedLogin);
            }

            if (isErrorWithType(error) && error.status === 403) {
                return onChangeViewType(CustomerViewType.CancellableEnforcedLogin);
            }

            onContinueAsGuestError(error);
        }
    };

    private handleShowReview: () => void = () => {
        const { 
            onChangeViewType = noop,
         } = this.props;

        const {
            isContinuingAsGuest
        } = this.state

        console.log('isContinuingAsGuest: ', isContinuingAsGuest);
        this.setState({ isContinuingAsGuest: true }, () => {
            console.log('isContinuingAsGuest: ', this.state.isContinuingAsGuest);
        });

        onChangeViewType(CustomerViewType.Guest);
        console.log('Returning User to Guest Form.');
    };

    private handleSignIn: (credentials: CustomerCredentials) => Promise<void> = async (
        credentials,
    ) => {
        const {
            signIn,
            onSignIn = noop,
            onSignInError = noop,
            onChangeViewType = noop,
            // customer
        } = this.props;

        try {
            await signIn(credentials);

            onSignIn();

            // console.log('Changing view to Review')

            onChangeViewType(CustomerViewType.Review)

            this.draftEmail = undefined;
        } catch (error) {
            onSignInError(error);
        }
    };

    private handleCreateAccount: (values: CreateAccountFormValues) => void = async (values) => {
        const {
            createAccount = noop,
            onAccountCreated = noop,
        } = this.props;

        await createAccount(mapCreateAccountFromFormValues(values));

        onAccountCreated();
    };

    private showCreateAccount: () => void = () => {
        const { onChangeViewType = noop } = this.props;

        onChangeViewType(CustomerViewType.CreateAccount);
    };

    private handleCancelCreateAccount: () => void = () => {
        const { clearError, onChangeViewType = noop, createAccountError } = this.props;

        if (createAccountError) {
            clearError(createAccountError);
        }

        onChangeViewType(CustomerViewType.Login);
    };

    private handleCancelSignIn: () => void = () => {
        const { clearError, onChangeViewType = noop, signInError } = this.props;

        if (signInError) {
            clearError(signInError);
        }

        onChangeViewType(CustomerViewType.Guest);
    };

    private handleChangeEmail: (email: string) => void = (email) => {
        const { analyticsTracker } = this.props;

        const {
            isContinuingAsGuest,
        } = this.state;

        this.draftEmail = email;
        analyticsTracker.customerEmailEntry(email);

        // Print a statement to the console
        console.log(`Email changed to: ${email}`);
        isContinuingAsGuest? this.setState({isContinuingAsGuest:false}) : console.log("No change in isContinuingAsGuest: ", isContinuingAsGuest)
    };

    private handleShowLogin: () => void = () => {
        const { onChangeViewType = noop } = this.props;

        onChangeViewType(CustomerViewType.Login);
    };

    private handleMultiShippingModeSwitch: () => void = async () => {
            const {
                consignments,
                isMultiShippingMode,
                isNewMultiShippingUIEnabled,
                onToggleMultiShipping = noop,
                onUnhandledError = noop,
                updateShippingAddress,
                deleteConsignments,
            } = this.props;
    
            try {
                this.setState({ isInitializing: true });
    
                if (isNewMultiShippingUIEnabled) {
                    if (isMultiShippingMode && consignments.length) {
                        // Collapse all consignments into one
                        await updateShippingAddress(consignments[0].shippingAddress);
                    }
                    else {
                        await deleteConsignments();
                    }
                }
                else if (isMultiShippingMode && consignments.length > 1) {
                    // Collapse all consignments into one
                    await updateShippingAddress(consignments[0].shippingAddress);
                }
            } catch (error) {
                onUnhandledError(error);
            } finally {
                this.setState({ isInitializing: false });
            }
    
            onToggleMultiShipping();
        };
    
    private handleMultiShippingSubmit: (values: MultiShippingFormValues) => void = async ({
            orderComment,
        }) => {
            const { customerMessage, updateCheckout, navigateNextStep, onUnhandledError } = this.props;
    
            try {
                if (customerMessage !== orderComment) {
                    await updateCheckout({ customerMessage: orderComment });
                }
    
                navigateNextStep(false);
            } catch (error) {
                if (error instanceof Error) {
                    onUnhandledError(error);
                }
            }
        };

    private handleSingleShippingSubmit: (values: SingleShippingFormValues) => void = async ({
            billingSameAsShipping,
            shippingAddress: addressValues,
            orderComment,
        }) => {
            const {
                customerMessage,
                updateCheckout,
                updateShippingAddress,
                updateBillingAddress,
                navigateNextStep,
                onUnhandledError,
                shippingAddress,
                billingAddress,
                methodId,
                email
            } = this.props;
            
            console.log("Address Values: ", {addressValues});

            const updatedShippingAddress = addressValues && mapAddressFromFormValues(addressValues);

            console.log("Updated Shipping Address Values: ", {updatedShippingAddress});

            const promises: Array<Promise<CheckoutSelectors>> = [];

            console.log("MethodID: ", {methodId});

            const hasRemoteBilling = this.hasRemoteBilling(methodId);

            console.log("hasRemoteBilling: ", {hasRemoteBilling});
            console.log("Email: ", {email});
    
            if (!isEqualAddress(updatedShippingAddress, shippingAddress) || shippingAddress?.shouldSaveAddress !== updatedShippingAddress?.shouldSaveAddress) {
                promises.push(updateShippingAddress(updatedShippingAddress || {}));
            }
    
            if (
                billingSameAsShipping &&
                updatedShippingAddress &&
                !isEqualAddress(updatedShippingAddress, billingAddress) &&
                !hasRemoteBilling
            ) {
                promises.push(updateBillingAddress(updatedShippingAddress));
            }
    
            if (customerMessage !== orderComment) {
                promises.push(updateCheckout({ customerMessage: orderComment }));
            }
    
            try {
                await Promise.all(promises);
    
                navigateNextStep(billingSameAsShipping);
            } catch (error) {
                if (error instanceof Error) {
                    onUnhandledError(error);
                }
            }
        };

    private handleUseNewAddress: (address: Address, itemId: string) => void = async (
            address,
            itemId,
        ) => {
            const { unassignItem, onUnhandledError } = this.props;
    
            try {
                await unassignItem({
                    address,
                    lineItems: [
                        {
                            quantity: 1,
                            itemId,
                        },
                    ],
                });
    
                location.href = '/account.php?action=add_shipping_address&from=checkout';
            } catch (error) {
                if (error instanceof UnassignItemError) {
                    onUnhandledError(new UnassignItemError(error));
                }
            }
        };

    private hasRemoteBilling: (methodId?: string) => boolean = (methodId) => {
        const PAYMENT_METHOD_VALID = ['amazonpay'];

        return PAYMENT_METHOD_VALID.some((method) => method === methodId);
    };

    // private executePaymentMethodCheckoutOrContinue: () => void = async () => {
    //     const {
    //         executePaymentMethodCheckout,
    //         onContinueAsGuest = noop,
    //         providerWithCustomCheckout
    //     } = this.props;

    //     if (providerWithCustomCheckout && providerWithCustomCheckout !== PaymentMethodId.StripeUPE) {
    //         await executePaymentMethodCheckout({
    //             methodId: providerWithCustomCheckout,
    //             continueWithCheckoutCallback: onContinueAsGuest,
    //             checkoutPaymentMethodExecuted: (payload) => this.checkoutPaymentMethodExecuted(payload)
    //         });
    //     } else {
    //         onContinueAsGuest();
    //     }
    // };

    // private checkoutPaymentMethodExecuted(payload?: CheckoutPaymentMethodExecutedOptions) {
    //     const { analyticsTracker } = this.props;

    //     analyticsTracker.customerPaymentMethodExecuted(payload);
    // }
}

export function mapToShippingProps({
    checkoutService,
    checkoutState,
}: CheckoutContextProps): WithCheckoutShippingProps | null {
    const {
        data: {
            getCart,
            getCheckout,
            getConfig,
            getCustomer,
            getConsignments,
            getShippingAddress,
            getBillingAddress,
            getShippingAddressFields,
            getShippingCountries,
        },
        statuses: {
            isShippingStepPending,
            isSelectingShippingOption,
            isLoadingShippingOptions,
            isUpdatingConsignment,
            isCreatingConsignments,
            isCreatingCustomerAddress,
            isLoadingShippingCountries,
            isUpdatingBillingAddress,
            isUpdatingCheckout,
            isDeletingConsignment,
        },
    } = checkoutState;

    const checkout = getCheckout();
    const config = getConfig();
    const consignments = getConsignments() || [];
    const customer = getCustomer();
    const cart = getCart();

    if (!checkout || !config || !customer || !cart) {
        return null;
    }

    const {
        checkoutSettings: {
            enableOrderComments,
            features,
            hasMultiShippingEnabled,
            googleMapsApiKey,
        },
    } = config;

    const methodId = getShippingMethodId(checkout, config);
    const isLoading =
        isLoadingShippingOptions() ||
        isSelectingShippingOption() ||
        isUpdatingConsignment() ||
        isCreatingConsignments() ||
        isUpdatingBillingAddress() ||
        isUpdatingCheckout() ||
        isCreatingCustomerAddress() ||
        isDeletingConsignment();

    const isNewMultiShippingUIEnabled =
        isExperimentEnabled(
            config.checkoutSettings,
            'PROJECT-4159.improve_multi_address_shipping_ui',
        );
    const shippableItemsCount = getShippableItemsCount(cart, isNewMultiShippingUIEnabled);
    const shouldShowMultiShipping =
        hasMultiShippingEnabled && !methodId && shippableItemsCount > 1;

    const countriesWithAutocomplete = ['US', 'CA', 'AU', 'NZ', 'GB'];

    const validateGoogleMapAutoCompleteMaxLength =
        isExperimentEnabled(
            config.checkoutSettings,
            'CHECKOUT-8776.google_autocomplete_max_length_validation',
        ) && Boolean(googleMapsApiKey);

    const validateAddressFields =
        isExperimentEnabled(
            config.checkoutSettings,
            'CHECKOUT-7560.address_fields_max_length_validation',
        );

    const shippingAddress =
        !shouldShowMultiShipping && consignments.length > 1 ? undefined : getShippingAddress();

    const providerWithCustomCheckout = getProviderWithCustomCheckout(
        config.checkoutSettings.providerWithCustomCheckout,
    );

    return {
        assignItem: checkoutService.assignItemsToAddress,
        billingAddress: getBillingAddress(),
        cart,
        cartHasPromotionalItems: hasPromotionalItems(cart),
        consignments,
        countries: getShippingCountries() || EMPTY_ARRAY,
        countriesWithAutocomplete,
        customer,
        customerMessage: checkout.customerMessage,
        createCustomerAddress: checkoutService.createCustomerAddress,
        deinitializeShippingMethod: checkoutService.deinitializeShipping,
        deleteConsignments: deleteConsignmentsSelector({ checkoutService, checkoutState }),
        getFields: getShippingAddressFields,
        googleMapsApiKey,
        initializeShippingMethod: checkoutService.initializeShipping,
        isGuest: customer.isGuest,
        isInitializing: isLoadingShippingCountries() || isLoadingShippingOptions(),
        isLoading,
        isShippingStepPending: isShippingStepPending(),
        loadShippingAddressFields: checkoutService.loadShippingAddressFields,
        loadBillingAddressFields: checkoutService.loadBillingAddressFields,
        loadShippingOptions: checkoutService.loadShippingOptions,
        methodId,
        providerWithCustomCheckout,
        shippingAddress,
        shouldRenderWhileLoading: features['CHECKOUT-8300.improve_extension_performance'] ?? true,
        shouldShowMultiShipping,
        isNewMultiShippingUIEnabled,
        validateGoogleMapAutoCompleteMaxLength,
        validateAddressFields,
        shouldShowOrderComments: enableOrderComments,
        signOut: checkoutService.signOutCustomer,
        unassignItem: checkoutService.unassignItemsToAddress,
        updateBillingAddress: checkoutService.updateBillingAddress,
        updateCheckout: checkoutService.updateCheckout,
        updateShippingAddress: checkoutService.updateShippingAddress,
        isFloatingLabelEnabled: isFloatingLabelEnabled(config.checkoutSettings),
        shouldRenderStripeForm: providerWithCustomCheckout === PaymentMethodId.StripeUPE && shouldUseStripeLinkByMinimumAmount(cart),
    };
}

export function mapToWithCheckoutCustomerProps({
    checkoutService,
    checkoutState,
}: CheckoutContextProps): WithCheckoutCustomerProps | null {
    const {
        data: {
            getBillingAddress,
            getCustomerAccountFields,
            getCheckout,
            getCustomer,
            getCart,
            getSignInEmail,
            getConfig,
            isPaymentDataRequired,
        },
        errors: { getSignInError, getSignInEmailError, getCreateCustomerAccountError },
        statuses: {
            isContinuingAsGuest,
            isExecutingPaymentMethodCheckout,
            isInitializingCustomer,
            isSigningIn,
            isSendingSignInEmail,
            isCreatingCustomerAccount,
        },
    } = checkoutState;

    const billingAddress = getBillingAddress();
    const checkout = getCheckout();
    const customer = getCustomer();
    const cart = getCart();
    const signInEmail = getSignInEmail();
    const config = getConfig();

    if (!checkout || !config || !cart) {
        return null;
    }

    const {
        checkoutSettings: {
            privacyPolicyUrl,
            requiresMarketingConsent,
            isSignInEmailEnabled,
            isAccountCreationEnabled,
            isExpressPrivacyPolicy,
            features,
        },
    } = config as StoreConfig & { checkoutSettings: { isAccountCreationEnabled: boolean } };

    const providerWithCustomCheckout = getProviderWithCustomCheckout(
        config.checkoutSettings.providerWithCustomCheckout,
    );

    const fixNewsletterCheckboxExperimentEnabled = features['CHECKOUT-8033.fix_newletter_checkbox'];

    return {
        customerAccountFields: getCustomerAccountFields(),
        canSubscribe: config.shopperConfig.showNewsletterSignup,
        checkoutButtonIds: config.checkoutSettings.remoteCheckoutProviders,
        clearError: checkoutService.clearError,
        createAccount: checkoutService.createCustomerAccount,
        continueAsGuest: checkoutService.continueAsGuest,
        sendLoginEmail: checkoutService.sendSignInEmail,
        defaultShouldSubscribe: config.shopperConfig.defaultNewsletterSignup,
        deinitializeCustomer: checkoutService.deinitializeCustomer,
        executePaymentMethodCheckout: checkoutService.executePaymentMethodCheckout,
        email: billingAddress?.email || customer?.email,
        firstName: customer?.firstName,
        fixNewsletterCheckboxExperimentEnabled,
        forgotPasswordUrl: config.links.forgotPasswordLink,
        initializeCustomer: checkoutService.initializeCustomer,
        isCreatingAccount: isCreatingCustomerAccount(),
        createAccountError: getCreateCustomerAccountError(),
        hasBillingId: !!billingAddress?.id,
        isContinuingAsGuest: isContinuingAsGuest(),
        isExecutingPaymentMethodCheckout: isExecutingPaymentMethodCheckout(),
        isInitializing: isInitializingCustomer(),
        isSignInEmailEnabled,
        isAccountCreationEnabled,
        isGuestEnabled: config.checkoutSettings.guestCheckoutEnabled,
        isSigningIn: isSigningIn(),
        isSendingSignInEmail: isSendingSignInEmail(),
        signInEmail,
        signInEmailError: getSignInEmailError(),
        privacyPolicyUrl,
        providerWithCustomCheckout,
        requiresMarketingConsent,
        signIn: checkoutService.signInCustomer,
        signInError: getSignInError(),
        isFloatingLabelEnabled: isFloatingLabelEnabled(config.checkoutSettings),
        isExpressPrivacyPolicy,
        isPaymentDataRequired: isPaymentDataRequired(),
        shouldRenderStripeForm: providerWithCustomCheckout === PaymentMethodId.StripeUPE && shouldUseStripeLinkByMinimumAmount(cart),
    };
}

export function mapToCombinedProps({
    checkoutService,
    checkoutState,
}: CheckoutContextProps): WithCheckoutCustomerProps & WithCheckoutShippingProps | null {
    const shippingProps = mapToShippingProps({ checkoutService, checkoutState });
    const customerProps = mapToWithCheckoutCustomerProps({ checkoutService, checkoutState });

    if (!shippingProps || !customerProps) {
        return null;
    }

    return {
        ...shippingProps,
        ...customerProps,
    };
}

export default withAnalytics(withCheckout(mapToCombinedProps)(CombinedStep));


// export default withAnalytics(withCheckout(mapToWithCheckoutCustomerProps)(CombinedStep));
