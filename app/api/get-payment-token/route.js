import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export async function POST(request) {
  const { id, productName, price, quantity } = await request.json();

  let parameter = {
    transaction_details: {
      order_id: id,
      gross_amount: price * quantity,
    },
    item_details: [
      {
        id: id,
        price: price,
        quantity: quantity,
        name: productName,
      },
    ],
  };

  let response = await snap.createTransaction(parameter);
  const token = await response.token;
  return NextResponse.json({ token });
}
