import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const SysConfigRoute: AppRouteModule = {
  path: '/sys-config',
  name: 'SysConfig',
  redirect: '/sys-config/ldap',
  component: LAYOUT,
  meta: {
    icon: 'ion:settings-outline',
    title: t('routes.menu.sysConfig.management'),
  },
  children: [
    {
      path: 'ldap',
      name: 'LDAP',
      component: () => import('/@/views/SysConfig/index.vue'),
      meta: {
        title: t('routes.menu.sysConfig.ldap'),
      },
    },
    {
      path: 'wechat',
      name: 'Wechat',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.menu.sysConfig.wechat'),
      },
    },
    {
      path: 'dingding',
      name: 'Dingding',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.menu.sysConfig.dingding'),
      },
    },
    {
      path: 'feishu',
      name: 'Feishu',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.menu.sysConfig.feishu'),
      },
    },
    {
      path: 'customized-menu',
      name: 'CustomizedMenu',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.menu.sysConfig.customizedMenu'),
      },
    },
  ],
};

export default SysConfigRoute;
