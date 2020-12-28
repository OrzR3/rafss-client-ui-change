export const istudentFlag = 'MASTER';
/*
 目前已有学校编码列表：
北京联合大学--内网 BUU-INTRANET
北京联合大学--外网 BUU-EXTRANET
 */
export const istudentInfo = {
  'BUU-INTRANET': {
    type: 'BUU-INTRANET',
    name: '北京联合大学--内网',
    handleLocation: {
      // 文书类
      'INSTRUMENT': '办理地点：北京市朝阳区北四环东路97号，北京联合大学校本部8号楼B座一层档案馆对外服务办公室，电话64900956。',
      //人事类
      'PERSONNEL': '办理地点：北京市朝阳区北四环东路97号，北京联合大学校本部老图书馆2001，电话64900350。',
      //财会类
      'ACCOUNTING': '办理地点：北京市朝阳区北四环东路97号，北京联合大学校本部旧图书馆四层406办公室，电话64900130。'
    }
  },
  'BUU-EXTRANET': {
    type: 'BUU-EXTRANET',
    name: '北京联合大学--外网',
    handleLocation: "办理地点：北京市朝阳区北四环东路97号，北京联合大学校本部8号楼B座一层档案馆对外服务办公室，电话64900956。"
  },
}
