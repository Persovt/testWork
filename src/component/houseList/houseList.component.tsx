import React, { useEffect } from "react";
import { Pagination, Select, List, Typography } from "antd";

const { Option } = Select;
type AuthDataType = {
  AuthData: any;
};

export const HouseList = ({ AuthData }: AuthDataType) => {
  const [currectIdHouse, setCurrectIdHouse] = React.useState<number>(1);
  const [perPage, setPerPage] = React.useState<number>(10);
  const [currectPage, setCurrectPage] = React.useState<number>(1);

  const [currectHouse, setCurrectHouse] = React.useState<any>({ data: [] });
  const [houseList, setHouseList] = React.useState<any>([]);

  useEffect(() => {
    fetch("http://test-alpha.reestrdoma.ru/api/reestrdoma/companies/", {
      headers: {
        Authorization: `Bearer ${AuthData.token.access}`,
      },
    })
      .then((res) => res.json())
      .then(({ data }) => setHouseList(data));
  }, [AuthData.token.access]);

  useEffect(() => {
    fetch(
      `http://test-alpha.reestrdoma.ru/api/reestrdoma/company/houses/${currectIdHouse}/?page=${currectPage}&perPage=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${AuthData.token.access}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setCurrectHouse(data));
  }, [currectIdHouse, currectPage, perPage, AuthData.token.access]);

  return (
    <>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a house"
        optionFilterProp="children"
        onChange={(value: number) => setCurrectIdHouse(value)}
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {houseList?.map((item: any) => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>

      <List
        bordered
        dataSource={currectHouse?.data}
        renderItem={(item: any) => {
          let DATE: any = new Date(item.createdAt);
          return (
            <List.Item>
              <Typography.Text>
                id: {item.id} address: {item.address} Кол-во квартир:{" "}
                {item.reestrFlatCount} Дата:
                {DATE.getDay() +
                  "." +
                  DATE.getMonth() +
                  "." +
                  DATE.getFullYear()}
              </Typography.Text>
            </List.Item>
          );
        }}
      />
      <Pagination
        onChange={(value) => setCurrectPage(value)}
        onShowSizeChange={(current, pageSize) => {
          setCurrectPage(current);
          setPerPage(pageSize);
        }}
        defaultCurrent={1}
        total={currectHouse?.links?.objectsCount}
      />
    </>
  );
};
