import { BasicColumn, FormSchema } from '@/components/Table';
import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel';
import { defHttp } from '@/utils/http/axios';

import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'loginName',
    label: '登录名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'roleType',
    label: '角色',
    component: 'Select',
    componentProps: {
      options: [
        { label: '普通用户', value: 0 },
        { label: '管理员', value: 1 },
      ],
    },
    colProps: { span: 6 },
  },
];

export const columnSchema: BasicColumn[] = [
  {
    title: '登录名',
    dataIndex: 'loginName',
    width: 200,
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    width: 150,
  },
  {
    title: '角色',
    dataIndex: 'roleType',
    width: 100,
    customRender: ({ record }) => {
      const roleType = record.roleType;
      const enable = ~~roleType === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '普通用户' : '管理员';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 150,
  },
  {
    title: '注册来源',
    dataIndex: 'registeredSource',
    width: 150,
    customRender: ({ record }) => {
      const rs = record.registeredSource;
      if (rs == 1) {
        return 'DHorse';
      } else if (rs == 2) {
        return 'LDAP';
      } else if (rs == 3) {
        return '企业微信';
      } else if (rs == 4) {
        return '钉钉';
      } else if (rs == 5) {
        return 'CAS';
      } else if (rs == 6) {
        return '飞书';
      }
    },
  },
];

interface UserItem {
  id: string;
  loginName: string;
  userName: string;
  roleType: number;
  email: string;
  registeredSource: number;
}

export const uerPage = (params?: BasicPageParams) =>
  defHttp.post<BasicFetchResult<UserItem>>({ url: '/sysUser/page', params });

export const addFormSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'loginName',
    label: '登录名',
    component: 'Input',
    required: true,
  },
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '登录密码',
    component: 'InputPassword',
    required: true,
    ifShow({ values }) {
      const { id } = values;
      return !id;
    },
  },
  {
    field: 'confirmPassword',
    label: '确认登录密码',
    component: 'InputPassword',
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('密码不能为空');
            }
            if (value !== values.password) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
    ifShow({ values }) {
      const { id } = values;
      return !id;
    },
  },
  {
    field: 'roleType',
    label: '角色',
    component: 'Select',
    componentProps: {
      options: [
        { label: '普通用户', value: 0 },
        { label: '管理员', value: 1 },
      ],
    },
    required: true,
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
  },
  {
    label: '注册来源',
    field: 'registeredSource',
    component: 'Input',
    required: true,
    ifShow: false,
    defaultValue: 1,
  },
];
