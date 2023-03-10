<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Text;
use App\Models\Tag;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        DB::table('texts')->delete();
        DB::table('tags')->delete();

        Text::create([
            'id' => 1,
            'text' => 'ホゲホゲ',
        ]);
        Text::create([
            'id' => 2,
            'text' => 'ふがふが',
        ]);
        Text::create([
            'id' => 3,
            'text' => 'Fooooooo',
        ]);
        Text::create([
            'id' => 4,
            'text' => 'Barrrrrrrrrr',
        ]);
        Text::create([
            'id' => 5,
            'text' => 'サンプルテキスト',
        ]);
        Tag::create([
            'text_id' => 1,
            'name' => '陰山',
        ]);
        Tag::create([
            'text_id' => 1,
            'name' => '開発中',
        ]);
        Tag::create([
            'text_id' => 1,
            'name' => 'お試し',
        ]);

    }
}
