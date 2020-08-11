<div align="center">
	<img style="object-fit:contain" height="100" src="https://dev.reev.tech/assets/favicon.png" alt="reev technologies">
	<br>
	<p>
		<p>
			<sup>
				<a href="reev.tech">by reev technologies</a>
			</sup>
		</p>
	</p>
</div>

<p align="center">
	<a href="https://reev.tech/contact">Contact us</a>&nbsp;&nbsp;&nbsp;
	<a href="https://www.linkedin.com/company/reev-technologies">LinkedIn</a>&nbsp;&nbsp;&nbsp;
	<a href="https://facebook.com/reevtechnologies">Facebook</a>&nbsp;&nbsp;&nbsp;
	<a href="https://instagram.com/reevtechnologies">Instagram</a>
</p>
<br>

Here's a basic example document write that would trigger this extension:

```js
admin.firestore().collection('messages').add({
  to: '+1234567890',
  message: "Hello from Firebase!",
})
```