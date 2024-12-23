// 創建延誤檢查工具函數
export const createDelayChecker = (companyName, lineNames) => {
  return (delayData) => {
    if (!Array.isArray(delayData)) return false;
    
    return delayData.find(d => {
      // 檢查公司名稱
      const isCompanyMatch = d.company?.includes(companyName);
      
      // 檢查路線名稱（支持多個名稱）
      const lineNameArray = Array.isArray(lineNames) ? lineNames : [lineNames];
      const isLineMatch = lineNameArray.some(lineName => 
        d.name?.includes(lineName)
      );
      
      return isCompanyMatch || isLineMatch;
    });
  };
}; 