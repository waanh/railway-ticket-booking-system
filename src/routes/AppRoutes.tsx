import { Route, Routes, Navigate } from "react-router-dom";
import { HeaderAndFooter } from "../pages/HeaderAndFooter";
import { Main } from "../pages/main/Main";
import { ChoiceRoute } from "../pages/choice-route/ChoiceRoute";
import { ListRoutes } from "../pages/list-routes/ListRoutes";
import { ListCoaches } from "../pages/coaches/ListCoaches";
import { ListPassengers } from "../pages/list-passengers/ListPassengers";
import { Payment } from "../pages/payment/Payment";
import { Order } from "../pages/order/Order";
import { SuccessfulOrder } from "../pages/successful-order/Successful-order";

export function AppRoutes() {
  return (
    <Routes>
      <Route path='' element={<HeaderAndFooter />}>
        <Route index element={<Main />} />
        <Route path='route' element={<ChoiceRoute />}>
          <Route index element={<ListRoutes />} />
          <Route path='coach' element={<ListCoaches />} />
          <Route path='passengers' element={<ListPassengers />} />
          <Route path='payment' element={<Payment />} />
          <Route path='order' element={<Order />} />
          <Route path='*' element={<Navigate to='/route' replace />} /> 
        </Route>
        <Route path='success' element={<SuccessfulOrder />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
}


