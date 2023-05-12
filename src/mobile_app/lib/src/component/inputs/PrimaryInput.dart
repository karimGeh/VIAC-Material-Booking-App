import 'package:flutter/material.dart';

class PrimaryInput extends StatefulWidget {
  final String? hintText;
  final String? labelText;
  final String? helperText;
  final String? errorText;
  final bool? isDense;
  final bool? isRequired;
  final bool? isPassword;
  final Function? onChanged;
  final Function? onSaved;
  final Function? validator;

  PrimaryInput({
    this.hintText,
    this.labelText,
    this.helperText,
    this.errorText,
    this.isDense,
    this.isRequired,
    this.isPassword,
    this.onChanged,
    this.onSaved,
    this.validator,
  });

  @override
  _PrimaryInputState createState() => _PrimaryInputState();
}

class _PrimaryInputState extends State<PrimaryInput> {
  bool _isPassword = false;
  final FocusNode _focusNode = FocusNode();

  @override
  void initState() {
    super.initState();
    _isPassword = widget.isPassword ?? false;
  }

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      onChanged: (value) {
        widget.onChanged!(value);
      },
      onSaved: (value) {
        widget.onSaved!(value);
      },
      validator: (value) {
        widget.validator!(value);
      },
      obscureText: _isPassword,
      onTapOutside: (value) {
        _focusNode.unfocus();
      },
      onTap: () {
        _focusNode.requestFocus();
      },
      focusNode: _focusNode,
      decoration: InputDecoration(
        hintText: widget.hintText,
        labelText: widget.labelText,
        helperText: widget.helperText,
        errorText: widget.errorText == "" ? null : widget.errorText,
        isDense: widget.isDense,
        suffixIcon: widget.isPassword != null
            ? IconButton(
                onPressed: () {
                  setState(() {
                    _isPassword = !_isPassword;
                  });
                },
                icon: Icon(
                  _isPassword ? Icons.visibility : Icons.visibility_off,
                ),
              )
            : null,
      ),
    );
  }
}
