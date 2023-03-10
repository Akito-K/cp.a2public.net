@extends('layouts.common')
@section('content')

    <div class="search">
        {!! Form::text('', '', ['id' => 'paramSearchInput', 'placeholder' => 'タグ、テキストで絞り込む']) !!}
    </div>

{{--    <div class="sort">--}}
{{--        <button type="button" id="trigSortText" data-order="asc">テキストでソート <i></i></button>--}}
{{--        <button type="button" id="trigSortDate" data-order="asc">更新日時でソート <i></i></button>--}}
{{--    </div>--}}

    <div class="item" id="trigItemBoxes">
        @forelse($texts as $text)
            <div class="item__box bulletItemBox" data-id="{{ $text->id }}">
                <div class="item__box__value">
                    <div class="item__box__body">
                        <span class="item__box__body__text bulletText show">{!! nl2br(e($text->text)) !!}</span>
                        {!! Form::textarea('', $text->text, ['class' => 'item__box__body__input paramTextInput']) !!}
                    </div>
                    <div class="item__box__action bulletActionGroup show">
                        <i class="fa-regular fa-clipboard trigCopy"></i>
                        <i class="fa-solid fa-pen trigEdit"></i>
                        <i class="fa-regular fa-clone trigDuplicate"></i>
                    </div>
                    <div class="item__box__edit bulletEditGroup">
                        <i class="fa-solid fa-check trigUpdate"></i>
                        <i class="fa-solid fa-xmark trigCancel"></i>
                        <i class="fa-solid fa-trash-can trigDelete"></i>
                    </div>
                </div>
                <div class="item__box__tags bulletTags">
                    @isset($tags[$text->id])
                        @forelse($tags[$text->id] as $tag)
                            <div class="item__box__tag" data-tag-id="{{ $tag->id }}">
                                <span class="item__box__tag__text">{{ $tag->name }}</span>
                            </div>
                        @empty
                        @endforelse
                    @endisset
                </div>
            </div>
        @empty
            <p>No Data!</p>
        @endforelse
    </div>
    <div class="more">
        <i class="fa-regular fa-square-plus" id="trigAddItemBox"></i>
    </div>


@endsection
