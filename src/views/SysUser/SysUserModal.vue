<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { addFormSchema } from './data';
  import { defHttp } from '@/utils/http/axios';
  import { HashingFactory } from '@/utils/cipher';

  defineOptions({ name: 'SysUserModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: addFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增用户' : '编辑用户'));

  async function handleSubmit() {
    try {
      const values = await validate();
      console.log(values.password);
      values.password = HashingFactory.createMD5Hashing().hash(values.password).toUpperCase();
      values.confirmPassword = values.password;

      setModalProps({ confirmLoading: true });
      const url = !unref(isUpdate) ? '/sysUser/createUser' : '/sysUser/updateUser';
      await defHttp.post<void>({ url, params: values });
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
