<?php
declare(strict_types=1);

require_once __DIR__ . '/../config.php';
allow_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['ok' => false, 'error' => 'Method not allowed'], 405);
}

try {
    $input = read_input();

    $source = clean_str($input['source'] ?? 'website', 120);
    $pageUrl = clean_str($input['page_url'] ?? '', 255);
    $formId = clean_str($input['form_id'] ?? '', 120);
    $name = clean_str($input['name'] ?? '', 150);
    $email = clean_str($input['email'] ?? '', 180);
    $phone = clean_str($input['phone'] ?? '', 60);
    $subject = clean_str($input['subject'] ?? '', 220);
    $message = clean_str($input['message'] ?? '', 5000);
    $payload = $input['payload'] ?? [];

    if (!is_array($payload)) {
        $payload = ['raw' => (string)$payload];
    }

    $payloadJson = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($payloadJson === false) {
        $payloadJson = '{}';
    }

    if ($name === '' && $email === '' && $phone === '' && $subject === '' && $message === '' && empty($payload)) {
        send_json(['ok' => false, 'error' => 'Empty lead payload'], 422);
    }

    $sql = 'INSERT INTO leads (source, page_url, form_id, name, email, phone, subject, message, payload, is_read)
            VALUES (:source, :page_url, :form_id, :name, :email, :phone, :subject, :message, :payload, 0)';

    $stmt = db()->prepare($sql);
    $stmt->execute([
        ':source' => $source,
        ':page_url' => $pageUrl,
        ':form_id' => $formId,
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':subject' => $subject,
        ':message' => $message,
        ':payload' => $payloadJson,
    ]);

    send_json([
        'ok' => true,
        'lead_id' => (int)db()->lastInsertId(),
        'message' => 'Lead saved',
    ]);
} catch (Throwable $e) {
    send_json(['ok' => false, 'error' => $e->getMessage()], 500);
}

