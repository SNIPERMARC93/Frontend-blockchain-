import type {Asset} from '@/types';
import {AssetAssignment} from './AssetAssignment';
export function AssetTransfer({asset,onClose,currentName}:{asset:Asset;onClose:()=>void;currentName:string}){return <AssetAssignment asset={asset} onClose={onClose} currentName={currentName} transfer/>;}

