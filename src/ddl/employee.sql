CREATE TABLE Employees {
  id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY,
  username VARCHAR(20),
  password VARCHAR(20)
}