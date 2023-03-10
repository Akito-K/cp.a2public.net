<div class="navi navi--admin" id="bulletNavi">
{{--    <div class="navi__filter trigCloseNavi" id="bulletOpenNaviFilter"></div>--}}
    <nav class="navi__menu" id="bulletOpenNavi">
        <div class="header__title">
            <p class="header__title__name">管理者専用ページ</p>
            <div class="header__title__navi">
                <div class="header__title__navi-bar" id="trigCloseNavi">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
        </div>
        <ul class="navi__lists">
            {!! HTML::naviList(route('admin.manager.list'), '現場監督一覧', '<i class="fa-solid fa-users"></i>' ) !!}
            {!! HTML::naviList(route('admin.manager.create'), '新しく現場監督を登録する', '<i class="fa-solid fa-user"></i>' ) !!}
            {!! HTML::naviList(route('common.privacy-policy'), '個人情報保護方針', '<i class="fa-solid fa-lock"></i>' ) !!}
            <li class="navi__list">{!! HTML::logout(route('admin.logout'), 'navi__list__body navi__list__logout', '<i class="fa-solid fa-right-from-bracket"></i>') !!}</li>
        </ul>
    </nav>
</div>


