module.exports = {
  user          : process.env.NODE_ORACLEDB_USER || "hr",
  password      : process.env.NODE_ORACLEDB_PASSWORD || "welcome",
  connectString: " \
  (DESCRIPTION= \
      (ADDRESS=(PROTOCOL=TCP)(HOST=146.6.167.223)(PORT=1521)) \
      (CONNECT_DATA=(SID=ORCL)) \
  )",
  externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};
