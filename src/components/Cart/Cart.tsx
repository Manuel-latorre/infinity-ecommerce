
import {Badge} from "@nextui-org/react";
import CartIcon from "./CartIcon";

export default function Cart() {



  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <Badge color="danger" content={0} shape="circle">
            <CartIcon size={30} />
        </Badge>
      </div>
    </div>
  );
}
