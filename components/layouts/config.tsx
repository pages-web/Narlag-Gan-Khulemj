'use client';
import { configAtom } from '@/store/auth.store';
import { IConfig } from '@/types/auth.types';
import { IProduct } from '@/types/product.types';
import { useSetAtom } from 'jotai';
import { useLayoutEffect } from 'react';

const ConfigProvider = ({
  children,
  config,
  deliveryProducts,
  speacialProductIds,
}: React.PropsWithChildren & {
  config: IConfig;
  deliveryProducts?: IProduct[];
  speacialProductIds: string[];
}) => {
  const setConfig = useSetAtom(configAtom);
  const { deliveryConfig, erxesAppToken, paymentIds, name, isCheckRemainder } =
    config || {};

  useLayoutEffect(() => {
    setConfig({
      deliveryConfig,
      erxesAppToken,
      paymentIds,
      name,
      isCheckRemainder,
      deliveryProducts,
      speacialProductIds,
    });
  }, []);

  return <>{children}</>;
};

export default ConfigProvider;
