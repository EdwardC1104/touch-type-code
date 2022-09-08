import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const ncOptions = {
  onError(err: Error, req: NextApiRequest, res: NextApiResponse) {
    console.error(err);
    res.statusCode = 500;
    res.json({ message: err.message });
  },
};

const nextConnectFactory = () => nextConnect(ncOptions);

export default nextConnectFactory;
