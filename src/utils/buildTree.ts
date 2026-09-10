import type { OrganisationUnit, TreeNode } from '@/types';
export function buildTree(units: OrganisationUnit[]): TreeNode[] {
 const nodes = new Map(units.map(u=>[u.id,{...u,children:[]} as TreeNode]));
 const roots: TreeNode[] = [];
 for (const node of nodes.values()) {
  const visited = new Set([node.id]); let parent = node.parentId; let cyclic = false;
  while(parent && nodes.has(parent)){if(visited.has(parent)){cyclic=true;break;}visited.add(parent);parent=nodes.get(parent)!.parentId;}
  if(cyclic) throw new Error('Organisation hierarchy contains a cycle.');
  const parentNode = node.parentId ? nodes.get(node.parentId) : undefined;
  if(parentNode) parentNode.children.push(node); else roots.push(node);
 }
 const depth=(node:TreeNode,n:number)=>{node.depth=n;node.children.forEach(c=>depth(c,n+1));};
 roots.forEach(r=>depth(r,0));return roots;
}
export function descendantIds(units: OrganisationUnit[], id: string): string[] { const ids = new Set([id]); let changed = true; while(changed){changed=false; for(const u of units)if(u.parentId && ids.has(u.parentId) && !ids.has(u.id)){ids.add(u.id);changed=true;}} return [...ids]; }
export function unitPath(units: OrganisationUnit[], id: string): OrganisationUnit[] { const result: OrganisationUnit[]=[];const seen=new Set<string>();let unit=units.find(u=>u.id===id);while(unit&&!seen.has(unit.id)){seen.add(unit.id);result.unshift(unit);unit=units.find(u=>u.id===unit!.parentId);}return result; }

