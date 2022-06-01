<?php

namespace App\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use App\Enums\Permission as UserPermission;
use Illuminate\Support\Facades\Validator;




class CopyFilesCommand extends Command
{
    protected $signature = 'pickbazar:copy-files';

    protected $description = 'Copy necessary files';
    public function handle()
    {
        try {
            (new Filesystem)->ensureDirectoryExists(resource_path('views/emails'));

            $this->info('Copying resources files...');

            (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/resources/views/emails', resource_path('views/emails'));

            $this->info('Installation Complete');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
