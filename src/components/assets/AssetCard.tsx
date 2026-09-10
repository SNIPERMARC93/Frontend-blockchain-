import {Link} from 'react-router-dom';
import {Laptop,FileBadge,ArrowUpRight} from 'lucide-react';
import type {Asset} from '@/types';
import {Badge} from '@/components/ui/Badge';
export function AssetCard({asset}:{asset:Asset}){const Icon=asset.type==='Digital'?FileBadge:Laptop;return <Link to={'/assets/'+asset.id} className="asset-card"><div className="inline between"><span className="asset-icon"><Icon size={23}/></span><ArrowUpRight size={17} className="subtle"/></div><p className="mono subtle">{asset.assetId}</p><h3>{asset.name}</h3><p className="subtle">{asset.type} · {asset.condition}</p><Badge>{asset.status}</Badge></Link>;}

