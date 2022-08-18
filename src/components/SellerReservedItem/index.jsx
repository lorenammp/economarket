import "./style.css";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Product from "../Product";

function SellerReservedItem({ client, type }) {
  const orderTotalPrice = client.reduce(
    (acc, product) => acc + product.promotionalPrice,
    0
  );

  const formatedTotalPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(orderTotalPrice);

  return (
    <li className="reservedItem">
      <Accordion style={{ boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className="orderInfo">
            <div className="clientInfo">
              <div className="clientName">{client[0].user.name}</div>
            </div>

            <div className="reservedDate">{client[0].reservedDate}</div>

            <div className="orderPrice">{formatedTotalPrice}</div>

            <div className="orderGetDate">{client[0].getDate}</div>

            <div className="orderTotal">{client.length}</div>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <ul className="reservedDetails">
            {client.map((orderItem) => (
              <Product key={orderItem.id} product={orderItem} type={type} />
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
    </li>
  );
}

export default SellerReservedItem;
