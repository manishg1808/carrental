<?php
declare(strict_types=1);

require_once __DIR__ . '/../config.php';
allow_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['ok' => false, 'error' => 'Method not allowed'], 405);
}

try {
    $input = read_input();
    $pdo = db();

    if (!empty($input['all'])) {
        $pdo->exec('UPDATE leads SET is_read = 1 WHERE is_read = 0');
        send_json(['ok' => true, 'message' => 'All leads marked as read']);
    }

    $id = isset($input['id']) ? (int)$input['id'] : 0;
    if ($id <= 0) {
        send_json(['ok' => false, 'error' => 'Invalid lead id'], 422);
    }

    $stmt = $pdo->prepare('UPDATE leads SET is_read = 1 WHERE id = :id');
    $stmt->execute([':id' => $id]);

    send_json(['ok' => true, 'message' => 'Lead marked as read']);
} catch (Throwable $e) {
    send_json(['ok' => false, 'error' => $e->getMessage()], 500);
}

