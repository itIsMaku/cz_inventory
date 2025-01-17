import React from 'react';
import useNuiEvent from '../../hooks/useNuiEvent';
import InventoryGrid from './InventoryGrid';
import InventoryControl from './InventoryControl';
import InventoryHotbar from './InventoryHotbar';
import Fade from '../utils/Fade';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  selectLeftInventory,
  selectRightInventory,
  setupInventory,
  refreshSlots,
} from '../../store/inventory';
import { useExitListener } from '../../hooks/useExitListener';
import ReactTooltip from 'react-tooltip';
import type { Inventory as InventoryProps } from '../../typings';

const Inventory: React.FC = () => {
  const [inventoryVisible, setInventoryVisible] = React.useState(false);

  useNuiEvent<boolean>('setInventoryVisible', setInventoryVisible);
  useNuiEvent<false>('closeInventory', () => {
    setInventoryVisible(false);
    ReactTooltip.hide();
  });
  useExitListener(setInventoryVisible);

  const leftInventory = useAppSelector(selectLeftInventory);
  const rightInventory = useAppSelector(selectRightInventory);

  const dispatch = useAppDispatch();

  useNuiEvent<{
    leftInventory?: InventoryProps;
    rightInventory?: InventoryProps;
  }>('setupInventory', (data) => {
    dispatch(setupInventar(data));
    !inventoryVisible && setInventoryVisible(true);
  });

  useNuiEvent('refreshSlots', (data) => dispatch(refreshSlots(data)));

  return (
    <>
      <Fade visible={inventoryVisible} className="center-wrapper">
        <InventoryGrid inventory={leftInventory} />
        <InventoryControl />
        <InventoryGrid inventory={rightInventory} />
      </Fade>
      <InventoryHotbar items={leftInventar.items.slice(0, 5)} />
    </>
  );
};

export default Inventory;
