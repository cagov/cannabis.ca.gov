<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

class CAGOVDesignSystem {

    protected static $_instance = null;

    private $enabled_blocks = [];

    public static function get_instance(){
        if( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    private function __construct(){
        // Load All Block Files
        $this->load_block_dependencies();
    }

    private function load_block_dependencies(){
        // Note for Design System developers:
        // ROADMAP: Eventually, when there are more dependencies and installers would like to control which blocks are enabled, we can alter this function & create an admin page that will let administrators enable and disable blocks.
        // For now, all of the blocks will load.
        // New blocks should be registered alphabetically.
        require_once CAGOV_DESIGN_SYSTEM_BLOCKS_DIR_PATH . '/blocks/alert/plugin.php';
        require_once CAGOV_DESIGN_SYSTEM_BLOCKS_DIR_PATH . '/blocks/card/plugin.php';
        require_once CAGOV_DESIGN_SYSTEM_BLOCKS_DIR_PATH . '/blocks/card-grid/plugin.php';
        require_once CAGOV_DESIGN_SYSTEM_BLOCKS_DIR_PATH . '/blocks/content-navigation/plugin.php';
        require_once CAGOV_DESIGN_SYSTEM_BLOCKS_DIR_PATH . '/blocks/news/plugin.php';
    }
}
