<?php
declare(strict_types=1);

require_once __DIR__ . '/../config.php';
allow_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    send_json(['ok' => false, 'error' => 'Method not allowed'], 405);
}

try {
    $pdo = db();
    $summaryOnly = isset($_GET['summary']) && $_GET['summary'] === '1';

    $unreadCount = (int)$pdo->query('SELECT COUNT(*) FROM leads WHERE is_read = 0')->fetchColumn();
    $totalCount = (int)$pdo->query('SELECT COUNT(*) FROM leads')->fetchColumn();

    if ($summaryOnly) {
        send_json([
            'ok' => true,
            'summary' => [
                'unread' => $unreadCount,
                'total' => $totalCount,
            ],
        ]);
    }

    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 200;
    if ($limit < 1) $limit = 1;
    if ($limit > 1000) $limit = 1000;

    $onlyUnread = isset($_GET['unread']) && $_GET['unread'] === '1';
    $where = $onlyUnread ? 'WHERE is_read = 0' : '';

    $stmt = $pdo->query("SELECT id, source, page_url, form_id, name, email, phone, subject, message, payload, is_read, created_at
                         FROM leads
                         {$where}
                         ORDER BY id DESC
                         LIMIT {$limit}");
    $rows = $stmt->fetchAll();

    foreach ($rows as &$row) {
        $decoded = json_decode((string)($row['payload'] ?? ''), true);
        $row['payload'] = is_array($decoded) ? $decoded : [];
        $row['is_read'] = (int)$row['is_read'];
    }

    send_json([
        'ok' => true,
        'summary' => [
            'unread' => $unreadCount,
            'total' => $totalCount,
        ],
        'leads' => $rows,
    ]);
} catch (Throwable $e) {
    send_json(['ok' => false, 'error' => $e->getMessage()], 500);
}

