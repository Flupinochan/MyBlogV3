interface BranchInfo {
  fqdn: string;
  updateTime: string | null;
}

export interface BranchInfoMap {
  [branchName: string]: BranchInfo;
}
