import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const SysUserRoute: AppRouteModule = {
  path: '/sys-user',
  name: 'SysUser',
  redirect: '/sys-user/list',
  component: LAYOUT,
  meta: {
    icon: 'ooui:user-group-ltr',
    title: t('routes.menu.sysUser.management'),
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'list',
      name: 'SysUserList',
      component: () => import('/@/views/SysUser/index.vue'),
      meta: {
        title: t('routes.menu.sysUser.list'),
      },
    },
  ],
};

export default SysUserRoute;
