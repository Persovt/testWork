import React, { useEffect } from "react";
import { Divider, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setHouse } from "../../state/reducer";
import { Pagination } from "antd";
import { List, Typography } from "antd";
const { Option } = Select;

function onChange(value: any) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val: any) {
  console.log("search:", val);
}

export const HouseList = (props: any) => {
  const dispatch = useDispatch();
  const [currectIdHouse, setCurrectIdHouse] = React.useState(1);
  const [currectHouse, setCurrectHouse]: any = React.useState({ data: [] });
  const [perPage, setPerPage] = React.useState(10);
  const [currectPage, setCurrectPage] = React.useState(1);
  const houseData = props.AuthData.house.length > 0 ? props.AuthData.house : [];
  useEffect(() => {
    getHouse(props.AuthData.data?.token.access);
  }, [props.AuthData.data?.token.access]);

  useEffect(() => {
    fetch(
      `http://test-alpha.reestrdoma.ru/api/reestrdoma/company/houses/${currectIdHouse}/?page=${currectPage}&perPage=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${props.AuthData.data?.token.access}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setCurrectHouse(data));
  }, [currectIdHouse, currectPage]);

  console.log(currectHouse);

  const getHouse = (token: string) => {
    fetch("http://test-alpha.reestrdoma.ru/api/reestrdoma/companies/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(setHouse(data)));
  };

  return (
    <>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={(value: number) => setCurrectIdHouse(value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {houseData?.map((item: any) => (
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
