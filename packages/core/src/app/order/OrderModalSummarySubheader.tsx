import { LineItemMap } from '@bigcommerce/checkout-sdk';
import React, { FunctionComponent, memo } from 'react';

import { TranslatedString } from '@bigcommerce/checkout/locale';

import getItemsCount from './getItemsCount';

export interface OrderModalSummarySubheaderProps {
    items: LineItemMap;
}

const OrderModalSummarySubheader: FunctionComponent<OrderModalSummarySubheaderProps> = ({
    items,
}) => {
    const itemsCount = getItemsCount(items);
    const itemsText = itemsCount === 1 ? 'cart.item' : 'cart.items';

    return <>
        {itemsCount} <TranslatedString id={itemsText} />
    </>;
};

export default memo(OrderModalSummarySubheader);
