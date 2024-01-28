import { SystemProgram, PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";
import { Program, Provider } from "@coral-xyz/anchor";
import { CONNECTION, ESC_PRODUCT_PROGRAM_ID } from "./dataQrCode";
import { IDL } from "./product_program";

export class ProductOrder {
  name: string;
  
  constructor(props: {
    name: string;
  }) {
    this.name = props.name;
  }
}

export const getOrderPublicKey = (orderNumber: string, payer: PublicKey) =>
  PublicKey.findProgramAddressSync(
    [
      Buffer.from("ecommerce_solana_defi"),
      Buffer.from(Uint8Array.of(Number(orderNumber))), // Convert string to number
      payer.toBuffer(),
    ],
    ESC_PRODUCT_PROGRAM_ID
  )[0];
const createProgram = () => {
  // create read-only Provider
  const provider: Provider = {
    connection: CONNECTION,
  };

  return new Program(IDL, ESC_PRODUCT_PROGRAM_ID, provider);
};

// Create the write-order instruction (our custom program)
export const createWriteOrderInstruction = async (
  payer: PublicKey,
  productOrder: ProductOrder
) => {
  const program = createProgram();
  return await program.methods
    .createESCOrder(
      productOrder.name,
    )
    .accounts({
      productOrder: getOrderPublicKey(productOrder.name, payer),
      payer,
      systemProgram: SystemProgram.programId,
    })
    .instruction();
};

// Display the order details from the on-chain data
export const displayOnChainPizzaOrder = async (orderPublicKey: PublicKey) => {
  console.log("displayOnChain...");
  const program = createProgram();
  console.log("got program!");

  try {
    return (await program.account.productOrder.fetch(
      orderPublicKey
    )) as ProductOrder;
  } catch {
    throw "Account data not found.";
  }
};