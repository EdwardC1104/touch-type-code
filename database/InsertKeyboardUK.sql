-- SQLite
DELETE FROM characterTbl;
INSERT INTO characterTbl (
  symbol,
  keyboardRow,
  keyboardColumn,
  keyWidthMultipler,
  usesSpecialEnterShape,
  keyTextPosition,
  shift,
  finger
)
VALUES
  -- Row 0
  ("¬", 0, 0, null, 0, "top", "right", "L5"),
  ("`", 0, 0, null, 0, "bottom", null, "L5"),
  ("!", 0, 1, null, 0, "top", "right", "L5"),
  ("1", 0, 1, null, 0, "bottom", null, "L5"),
  ('"', 0, 2, null, 0, "top", "right", "L4"),
  ("2", 0, 2, null, 0, "bottom", null, "L4"),
  ("£", 0, 3, null, 0, "top", "right", "L3"),
  ("3", 0, 3, null, 0, "bottom", null, "L3"),
  ("$", 0, 4, null, 0, "top", "right", "L2"),
  ("4", 0, 4, null, 0, "bottom", null, "L2"),
  ("%", 0, 5, null, 0, "top", "right", "L2"),
  ("5", 0, 5, null, 0, "bottom", null, "L2"),
  ("^", 0, 6, null, 0, "top", "left", "R2"),
  ("6", 0, 6, null, 0, "bottom", null, "R2"),
  ("&", 0, 7, null, 0, "top", "left", "R2"),
  ("7", 0, 7, null, 0, "bottom", null, "R2"),
  ("*", 0, 8, null, 0, "top", "left", "R3"),
  ("8", 0, 8, null, 0, "bottom", null, "R3"),
  ("(", 0, 9, null, 0, "top", "left", "R4"),
  ("9", 0, 9, null, 0, "bottom", null, "R4"),
  (")", 0, 10, null, 0, "top", "left", "R5"),
  ("0", 0, 10, null, 0, "bottom", null, "R5"),
  ("_", 0, 11, null, 0, "top", "left", "R5"),
  ("-", 0, 11, null, 0, "bottom", null, "R5"),
  ("+", 0, 12, null, 0, "top", "left", "R5"),
  ("=", 0, 12, null, 0, "bottom", null, "R5"),
  ("backspace", 0, 13, 2, 0, "bottom", null, "R5"),
  -- Row 1
  ("tab", 1, 0, 1.5, 0, "bottom", "right", "L5"),
  ("Q", 1, 1, null, 0, "top", "right", "L5"),
  ("W", 1, 2, null, 0, "top", "right", "L4"),
  ("E", 1, 3, null, 0, "top", "right", "L3"),
  ("R", 1, 4, null, 0, "top", "right", "L2"),
  ("T", 1, 5, null, 0, "top", "right", "L2"),
  ("Y", 1, 6, null, 0, "top", "left", "R2"),
  ("U", 1, 7, null, 0, "top", "left", "R2"),
  ("I", 1, 8, null, 0, "top", "left", "R3"),
  ("O", 1, 9, null, 0, "top", "left", "R4"),
  ("P", 1, 10, null, 0, "top", "left", "R5"),
  ("{", 1, 11, null, 0, "top", "left", "R5"),
  ("[", 1, 11, null, 0, "bottom", null, "R5"),
  ("}", 1, 12, null, 0, "top", "left", "R5"),
  ("]", 1, 12, null, 0, "bottom", null, "R5"),
  ("enter", 1, 13, 1.5, 1, "bottom", null, "R5"),
  -- Row 2
  ("caps", 2, 0, 2, 0, "bottom", null, "L5"),
  ("A", 2, 1, null, 0, "top", "right", "L5"),
  ("S", 2, 2, null, 0, "top", "right", "L4"),
  ("D", 2, 3, null, 0, "top", "right", "L3"),
  ("F", 2, 4, null, 0, "top", "right", "L2"),
  ("G", 2, 5, null, 0, "top", "right", "L2"),
  ("H", 2, 6, null, 0, "top", "left", "R2"),
  ("J", 2, 7, null, 0, "top", "left", "R2"),
  ("K", 2, 8, null, 0, "top", "left", "R3"),
  ("L", 2, 9, null, 0, "top", "left", "R4"),
  (":", 2, 10, null, 0, "top", "left", "R5"),
  (";", 2, 10, null, 0, "bottom", null, "R5"),
  ("@", 2, 11, null, 0, "top", "left", "R5"),
  ("'", 2, 11, null, 0, "bottom", null, "R5"),
  ("~", 2, 12, null, 0, "top", "left", "R5"),
  ("#", 2, 12, null, 0, "bottom", null, "R5"),
  -- Row 3
  ("lshift", 3, 0, 1.25, 0, "bottom", null, "L5"),
  ("|", 3, 1, null, 0, "top", "right", "L5"),
  ("\", 3, 1, null, 0, "bottom", null, "L5"),
  ("Z", 3, 2, null, 0, "top", "right", "L5"),
  ("X", 3, 3, null, 0, "top", "right", "L4"),
  ("C", 3, 4, null, 0, "top", "right", "L3"),
  ("V", 3, 5, null, 0, "top", "right", "L2"),
  ("B", 3, 6, null, 0, "top", "right", "L2"),
  ("N", 3, 7, null, 0, "top", "left", "R2"),
  ("M", 3, 8, null, 0, "top", "left", "R2"),
  ("<", 3, 9, null, 0, "top", "left", "R3"),
  (",", 3, 9, null, 0, "bottom", null, "R3"),
  (">", 3, 10, null, 0, "top", "left", "R4"),
  (".", 3, 10, null, 0, "bottom", null, "R4"),
  ("?", 3, 11, null, 0, "top", "left", "R5"),
  ("/", 3, 11, null, 0, "bottom", null, "R5"),
  ("rshift", 3, 12, 2.75, 0, "bottom", null, "R5"),
  -- Row 4
  ("lctrl", 4, 0, 1.5, 0, "bottom", null, "L5"),
  ("lwin", 4, 1, 1.2, 0, "bottom", null, "L5"),
  ("alt", 4, 2, 1.2, 0, "bottom", null, "R4"),
  ("space", 4, 3, 7.2, 0, "bottom", null, "L1"),
  ("altgr", 4, 9, 1.2, 0, "bottom", null, "R4"),
  ("rwin", 4, 10, 1.2, 0, "bottom", null, "R5"),
  ("rctrl", 4, 12, 1.5, 0, "bottom", null, "R5"),
  -- Lowercase Keys
  ("q", null, null, null, 0, null, null, null),
  ("w", null, null, null, 0, null, null, null),
  ("e", null, null, null, 0, null, null, null),
  ("r", null, null, null, 0, null, null, null),
  ("t", null, null, null, 0, null, null, null),
  ("y", null, null, null, 0, null, null, null),
  ("u", null, null, null, 0, null, null, null),
  ("i", null, null, null, 0, null, null, null),
  ("o", null, null, null, 0, null, null, null),
  ("p", null, null, null, 0, null, null, null),
  ("a", null, null, null, 0, null, null, null),
  ("s", null, null, null, 0, null, null, null),
  ("d", null, null, null, 0, null, null, null),
  ("f", null, null, null, 0, null, null, null),
  ("g", null, null, null, 0, null, null, null),
  ("h", null, null, null, 0, null, null, null),
  ("j", null, null, null, 0, null, null, null),
  ("k", null, null, null, 0, null, null, null),
  ("l", null, null, null, 0, null, null, null),
  ("z", null, null, null, 0, null, null, null),
  ("x", null, null, null, 0, null, null, null),
  ("c", null, null, null, 0, null, null, null),
  ("v", null, null, null, 0, null, null, null),
  ("b", null, null, null, 0, null, null, null),
  ("n", null, null, null, 0, null, null, null),
  ("m", null, null, null, 0, null, null, null);

