import { SocialRecoveryModule } from "abstractionkit";

import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { useCallback } from "react";
import { useClient } from "wagmi";


export const useHandleGuardian = () => {
  const { sdk, safe } = useSafeAppsSDK();
  const client = useClient();

  const addGuardian = useCallback(
    async ({
      guardianAddress,
    }: {
      guardianAddress: string;
    }) => {
      try {
        const srm = new SocialRecoveryModule();

        const transction1 = srm.createEnableModuleMetaTransaction(
          safe.safeAddress,
        );
        const transction2 = srm.createAddGuardianWithThresholdMetaTransaction(
          guardianAddress,
          BigInt(1), //threshold
        );

        const { safeTxHash } = await sdk.txs.send({
          // @ts-expect-error
          txs: [transction1, transction2],
        });

        console.log("Transaction hash: ", { safeTxHash });

        const safeTx = await sdk.txs.getBySafeTxHash(safeTxHash);
        console.log("Transaction details: ", { safeTx });
      } catch (e) {
        console.error("Error during transaction submission:", e);
      }
    },
    [safe, sdk],
  );

  const checkIsGuardian = useCallback(
    async ({
      guardianAddress,
    }: {
      guardianAddress: string;
    }) => {
      try {
        const srm = new SocialRecoveryModule();

        const isGuardian = await srm.isGuardian(
          client?.transport.url,
          safe.safeAddress,
          guardianAddress,
        );

        console.log("Is guardian: ", { isGuardian });
      } catch (e) {
        console.error("Error during transaction submission:", e);
      }
    },
    [safe],
  );

  const listGuardians = useCallback(async () => {
    const srm = new SocialRecoveryModule();

    const guardians = await srm.getGuardians(
      client?.transport.url,
      safe.safeAddress,
    );

    return guardians;
  }, [safe]);

  return { addGuardian, checkIsGuardian, listGuardians };
};
