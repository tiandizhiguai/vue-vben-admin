<template>
  <PageWrapper title="LDAP登录" contentBackground content="" contentClass="p-4">
    <BasicForm @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { BasicForm, useForm, FormSchema } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';
  import { PageWrapper } from '@/components/Page';
  import { defHttp } from '@/utils/http/axios';

  interface LdapModel {
    itemType: number;
    enable: number;
    url: string;
    adminDn: string;
    adminPassword: string;
    searchBaseDn: string;
  }

  const colProps = {
    span: 14,
  };

  const schemas: FormSchema[] = [
    {
      field: 'itemType',
      component: 'Input',
      label: '配置类型',
      ifShow: false,
    },
    {
      field: 'url',
      component: 'Input',
      label: '服务地址',
      colProps,
      componentProps: {
        placeholder: '如：ldap://127.0.0.1:10389',
      },
      required: true,
    },
    {
      field: 'adminDn',
      component: 'Input',
      label: '管理员DN',
      colProps,
      componentProps: {
        placeholder: '如：uid=admin,ou=developer,dc=example,dc=com',
      },
      required: true,
    },
    {
      field: 'adminPassword',
      component: 'InputPassword',
      label: '管理员密码',
      colProps,
      componentProps: {
        placeholder: '请输入管理员密码',
      },
      required: true,
    },
    {
      field: 'searchBaseDn',
      component: 'Input',
      label: '搜索DN',
      colProps,
      componentProps: {
        placeholder: '如：ou=developer,dc=example,dc=com',
      },
      required: true,
    },
    {
      field: 'enable',
      component: 'RadioGroup',
      label: '是否开启',
      colProps,
      componentProps: {
        options: [
          {
            label: '开启',
            value: 1,
          },
          {
            label: '关闭',
            value: 0,
          },
        ],
      },
      required: true,
    },
  ];

  const { createMessage } = useMessage();
  const [register, { validate, setProps, setFieldsValue, getFieldsValue }] = useForm({
    labelCol: {
      span: 4,
    },
    //wrapperCol: {
    //  span: 15,
    //},
    schemas: schemas,
    actionColOptions: {
      span: 14,
    },
    submitButtonOptions: {
      text: '提交',
    },
    submitFunc: customSubmitFunc,
  });

  onMounted(async () => {
    const ldapData = await defHttp.post<LdapModel>({ url: '/globalConfig/query/ldap' });
    setFieldsValue({
      itemType: ldapData.itemType,
      url: ldapData.url,
      adminDn: ldapData.adminDn,
      adminPassword: ldapData.adminPassword,
      searchBaseDn: ldapData.searchBaseDn,
      enable: ldapData.enable ? ldapData.enable : 0,
    });
  });

  async function customSubmitFunc() {
    try {
      await validate();
      setProps({
        submitButtonOptions: {
          loading: true,
        },
      });

      const params = getFieldsValue();
      console.log(params);
      await defHttp.post<void>({ url: '/globalConfig/ldap/addOrUpdate', params });
      setProps({
        submitButtonOptions: {
          loading: false,
        },
      });
      createMessage.success('操作成功！');
    } catch (error) {
      console.error(error);
    }
  }
</script>
<style lang="less" scoped>
  .form-wrap {
    padding: 24px;
    background-color: @component-background;
  }
</style>
